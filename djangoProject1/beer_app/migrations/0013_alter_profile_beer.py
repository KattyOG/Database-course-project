# Generated by Django 3.2.5 on 2021-08-26 16:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('beer_app', '0012_auto_20210826_1943'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='beer',
            field=models.JSONField(default=dict),
        ),
    ]
