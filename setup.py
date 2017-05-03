from setuptools import setup, find_packages
import os

version = '0.0'

classifiers = """
Development Status :: 3 - Alpha
License :: OSI Approved :: GNU General Public License v2 or later (GPLv2+)
Operating System :: OS Independent
Programming Language :: JavaScript
Programming Language :: Python :: 2.7
Programming Language :: Python :: 3.3
Programming Language :: Python :: 3.4
Programming Language :: Python :: 3.5
Programming Language :: Python :: 3.6
""".strip().splitlines()

package_json = {
    "dependencies": {
        "chart.js": "~2.5.0",
    },
    "devDependencies": {
        "eslint": "~3.15.0",
    }
}

long_description = (
    open('README.rst').read()
    + '\n' +
    open('CHANGES.rst').read()
    + '\n')

setup(
    name='repodono.chart',
    version=version,
    description="Charting integration for data tracked w/ repodono framework",
    long_description=long_description,
    classifiers=classifiers,
    keywords='',
    author='Tommy Yu',
    author_email='',
    url='https://github.com/repodono/repodono.chart',
    license='gpl',
    packages=find_packages('src'),
    package_dir={'': 'src'},
    namespace_packages=['repodono'],
    include_package_data=True,
    zip_safe=False,
    package_json=package_json,
    install_requires=[
        'setuptools',
        # -*- Extra requirements: -*-
        'nunja',
        'repodono.jobs',
    ],
    extras_require={
        'dev': [
            'calmjs.dev>=1.0.2,<2',
        ],
    },
    extras_calmjs={
        'node_modules': {
            'Chart.js': 'chart.js/dist/Chart.js',
        },
    },
    python_requires='>=2.7,!=3.0.*,!=3.1.*,!=3.2.*',
    entry_points={
        'calmjs.module': [
            'repodono.chart = repodono.chart',
        ],
        'calmjs.module.tests': [
            'repodono.chart.tests = repodono.chart.tests',
        ],
        'nunja.mold': [
            'repodono.chart.molds = repodono.chart:molds',
        ],
    },
    test_suite="repodono.chart.tests.make_suite",
)
