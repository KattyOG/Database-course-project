# Generated by Django 3.2.5 on 2021-08-02 18:27

import django.core.files.storage
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('beer_app', '0007_alter_beer_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='beer',
            name='image',
            field=models.ImageField(default='beer_not_found.png', storage=django.core.files.storage.FileSystemStorage(base_url='/media/', location='C:\\Users\\mir80\\PycharmProjects\\djangoProject1\\media/'), upload_to='images'),
        ),
    ]
