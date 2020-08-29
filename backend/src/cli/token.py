import secrets

import click

from src.cli.commands import commands, shared_options
from src.util import database


@commands.command()
@shared_options
def token(username, access):
    """Generate an authentication token."""
    token = secrets.token_bytes(20)

    with database() as conn:
        cursor = conn.cursor()
        cursor.execute("""SELECT 1 FROM system__users WHERE id = 1""")
        # If admin user doesn't yet exist, create it. Otherwise, update it.
        if not cursor.fetchone():
            cursor.execute(
                """INSERT INTO system__users (username, token) VALUES ("admin", ?)""",
                (token,),
            )
        else:
            cursor.execute(
                """UPDATE system_users UPDATE token = ? WHERE id = 1""", (token,)
            )

    click.echo(f"Generated new authentication token: {token.hex()}")