"""
This module implements the Flask application function pattern. To create a new
Flask app instance, call ``create_app()``.
"""

import flask
from werkzeug.exceptions import HTTPException
from werkzeug.utils import find_modules, import_string


def create_app(config=None):
    """
    Create, set up, and return a new Flask application object. If a ``config``
    is passed in, it will be modified and used; however, if one is not passed
    in, then the default configuration will be used.

    :param object config: A config object to configure Flask with.

    :return: The created Flask application.
    :rtype: flask.Flask
    """
    app = flask.Flask(__name__)

    with app.app_context():
        _register_blueprints(app)
        _register_error_handler(app)

    return app


def _register_blueprints(app):
    """
    Find all blueprints in the ``backend.web.routes`` package and register
    them with the passed-in Flask application.

    :param flask.Flask app: The application to register the blueprints with.
    """
    modules = find_modules("backend.web.routes", include_packages=True)
    for module_name in modules:
        module = import_string(module_name)
        if hasattr(module, "bp"):
            app.register_blueprint(module.bp)


def _register_error_handler(app):
    """
    Register a default error handler on the passed-in Flask application.

    :param flask.Flask app: The application to register the error handler with.
    """

    def handle_error(error):
        response = error.get_response()
        return response.data, response.status_code

    app.register_error_handler(HTTPException, handle_error)