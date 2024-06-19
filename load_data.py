import json
from django.core.management.base import BaseCommand
from Backend.api.models import MyModel

class Command(BaseCommand):
    help = 'Import data from JSON file'

    def handle(self, *args, **options):
        with open('Front-end/mockData/db.json') as f:
            data = json.load(f)
            for item in data:
                MyModel.objects.create(**item)
