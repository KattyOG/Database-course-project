# Generated by Django 3.2.5 on 2021-08-02 17:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('beer_app', '0005_auto_20210720_1917'),
    ]

    operations = [
        migrations.AddField(
            model_name='beer',
            name='image',
            field=models.ImageField(default='search_page/images/beer_not_found.png', upload_to='images'),
        ),
    ]
