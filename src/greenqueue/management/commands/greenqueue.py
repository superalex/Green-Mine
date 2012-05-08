# -*- coding: utf-8 -*-

from django.core.management.base import BaseCommand, CommandError
from django.conf import settings
from optparse import make_option

import logging
import zmq
import sys
import os

log = logging.getLogger('greenqueue')

from greenqueue import settings
from greenqueue.core import load_class

class Command(BaseCommand):
    option_list = BaseCommand.option_list + (
        make_option('--socket', action="store", dest="socket", default=settings.GREENQUEUE_BIND_ADDRESS,
            help="Tells greenqueue server to use this zmq push socket path instead a default."),
    )

    help = "Starts a greenqueue worker."
    args = "[]"

    def handle(self, *args, **options):
        settings.GREENQUEUE_BIND_ADDRESS = options['socket']
        service_handler = load_class(settings.GREENQUEUE_BACKEND)()
        service_handler.start()
