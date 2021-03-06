# -*- coding: utf-8 -*-

# DO NOT EDIT THIS FILE!
# This file has been autogenerated by dephell <3
# https://github.com/dephell/dephell

try:
    from setuptools import setup
except ImportError:
    from distutils.core import setup

readme = ""

setup(
    long_description=readme,
    name="repertoire",
    version="0.1.0",
    description="A release-oriented music server.",
    python_requires="==3.*,>=3.8.0",
    author="azuline",
    author_email="azuline@riseup.net",
    license="AGPL-3.0",
    entry_points={"console_scripts": ["repertoire = src.__main__:run"]},
    packages=[
        "backend",
        "backend.cli",
        "backend.graphql",
        "backend.indexer",
        "backend.library",
        "backend.webserver",
    ],
    package_dir={"backend": "src"},
    package_data={
        "repertoire": ["migrations/*.sql"],
        "repertoire.graphql": ["*.graphql"],
    },
    install_requires=[
        "ariadne==0.*,>=0.12.0",
        "click==7.*,>=7.1.0",
        "huey==2.*,>=2.3.0",
        "pillow==7.*,>=7.2.0",
        "python-dotenv==0.*,>=0.14.0",
        "quart==0.*,>=0.13.1",
        "requests==2.*,>=2.24.0",
        "tagfiles==0.*,>=0.3.2",
        "unidecode==1.*,>=1.1.1",
        "voluptuous==0.*,>=0.11.7",
        "yoyo-migrations==7.*,>=7.2.0",
    ],
    extras_require={
        "dev": [
            "autodocsumm==0.1.13",
            "black==20.8b1",
            "flake8==3.*,>=3.8.0",
            "isort==5.*,>=5.4.0",
            "pytest==6.*,>=6.1.1",
            "pytest-asyncio==0.*,>=0.14.0",
            "pytest-cov==2.*,>=2.10.1",
            "quart-cors==0.*,>=0.3.0",
            "snapshottest==0.*,>=0.6.0",
            "sphinx==3.*,>=3.2.1",
            "sphinx-autodoc-typehints==1.*,>=1.11.1",
            "sphinx-rtd-theme==0.*,>=0.5.0",
            "sphinxcontrib.httpdomain==1.*,>=1.7.0",
        ]
    },
)
