# -*- coding: utf-8 -*-
"""
Manager test case
"""

import unittest

from repodono.chart import sedml


class GETSedMLClientManagerTestCase(unittest.TestCase):

    def test_base(self):
        m1 = sedml.GETSedMLClientManager()
        self.assertEqual(m1.executable, 'get-sed-ml-client')
        m2 = sedml.GETSedMLClientManager(executable='/tmp/foo')
        self.assertEqual(m2.executable, '/tmp/foo')

    def test_verify_kwargs(self):
        manager = sedml.GETSedMLClientManager()
        with self.assertRaises(ValueError):
            manager.verify_run_kwargs()

    def test_verify_kwargs_value(self):
        manager = sedml.GETSedMLClientManager()
        self.assertEqual(
            manager.verify_run_kwargs(
                sedml_url='http://example.com/file.sedml'),
            {'sedml_url': 'http://example.com/file.sedml'}
        )

    def test_verify_kwargs_list(self):
        manager = sedml.GETSedMLClientManager()
        self.assertEqual(
            manager.verify_run_kwargs(sedml_url=[
                'http://example.com/file1.sedml',
                'http://example.com/file2.sedml',
            ]),
            {'sedml_url': 'http://example.com/file1.sedml'}
        )

    def test_get_args(self):
        manager = sedml.GETSedMLClientManager()
        args = manager.get_args(
            'working_dir', 'http://example.com/file.sedml')

        self.assertEqual(args[0], 'get-sed-ml-client')
        self.assertEqual(args[1], 'http://example.com/file.sedml')
        self.assertTrue(args[2].startswith('working_dir'))
