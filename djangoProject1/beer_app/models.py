from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings
from django.core.validators import MaxValueValidator, MinValueValidator


class Style(models.Model):
    style = models.CharField(max_length=50, verbose_name='Стиль пива')

    def __str__(self):
        return self.style


class Beer(models.Model):

    name = models.CharField(max_length=100, verbose_name='Название пива')
    style_id = models.ForeignKey(Style, on_delete=models.CASCADE, verbose_name='Id стиля пива')
    abv = models.PositiveSmallIntegerField(verbose_name='Крепость пива', validators=[MinValueValidator(0), MaxValueValidator(12)])
    ibu = models.PositiveSmallIntegerField(verbose_name='Горечь пива', validators=[MinValueValidator(0), MaxValueValidator(100)])
    image = models.ImageField(upload_to='images', default='images/beer_not_found.png')

    def __str__(self):
        return self.name


class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='profile', default='profile/beer_lover.png')
    beer = models.JSONField(default=dict)


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()


class Brewery(models.Model):

    name = models.CharField(max_length=100, verbose_name='Название пивоварни', null=True)
    address = models.CharField(max_length=100, verbose_name='Адрес пивоварни', null=True)
    city = models.CharField(max_length=50, verbose_name='Город', null=True)
    state = models.CharField(max_length=50, verbose_name='Штат', null=True)
    code = models.CharField(max_length=20, verbose_name='Индекс', null=True)
    country = models.CharField(max_length=50, verbose_name='Страна', null=True)
    phone = models.CharField(max_length=20, verbose_name='Номер телефона', null=True)
    website = models.CharField(max_length=100, verbose_name='Сайт', null=True)

    def __str__(self):
        return self.name


class Shop(models.Model):

    name = models.CharField(max_length=50, verbose_name='Название магазина')
    latitude = models.FloatField(verbose_name='Широта')
    longitude = models.FloatField(verbose_name='Долгота')
    owners_name = models.CharField(max_length=50, verbose_name='Имя владельца')

    def __str__(self):
        return self.name


class BeerBrewery(models.Model):

    beer_id = models.ForeignKey(Beer, on_delete=models.CASCADE, verbose_name='Id пива', related_name='beer_relate')
    brewery_id = models.ForeignKey(Brewery, on_delete=models.CASCADE, verbose_name='Id пивоварни', related_name='brewery_relate')

