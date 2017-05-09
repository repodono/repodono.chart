# -*- coding: utf-8 -*-
"""
Very rudimentary example.
"""

from os.path import sep
from repodono.jobs.manager import JobManager


class GETSedMLClientManager(JobManager):

    def __init__(self, executable='get-sed-ml-client'):
        """
        A simple wrapper around the GET SedML client.

        Arguments:

        executable
            The name/direct path to the executable.
        """

        super(GETSedMLClientManager, self).__init__()
        self.executable = executable

    def verify_run_kwargs(self, **kw):
        if 'sedml_url' not in kw:
            # XXX implement better verification
            raise ValueError("'sedml_url' is invalid")
        sedml_url = kw['sedml_url']
        if isinstance(sedml_url, list):
            sedml_url = sedml_url[0]
        return {'sedml_url': sedml_url}

    def get_args(self, working_dir, sedml_url, **kw):
        return (self.executable, sedml_url, working_dir + sep)
