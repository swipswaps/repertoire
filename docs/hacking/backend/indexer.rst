.. _backend_indexer:

Indexer
=======

The indexer is responsible for indexing the music library on the filesystem and
populating the database with the available metadata and information.

The indexer runs in three stages:

#. **Scan music directories** - Scan the filesystem for new music files and
   store them in the database.
#. **Build search index** - After indexing all new music files, build a search
   index with the new metadata.
#. **Extract album art** - Extract and store the album art from newly indexed
   releases. Generate thumbnails for the frontend.

.. note::

   The search index is currently extremely ad-hoc (i.e. a simple reverse
   index). In the future, a more fully-featured search engine will be
   integrated.

The following function executes all three stages:

.. autofunction:: src.indexer.run_indexer

Code documentation for the indexer implementation is as follows:

Scan music directories
----------------------

.. automodule:: src.indexer.scanner
   :members:
   :autosummary:

Build search index
------------------

.. automodule:: src.indexer.search
   :members:
   :autosummary:

Extract album art
-----------------

.. automodule:: src.indexer.covers
   :members:
   :autosummary:
