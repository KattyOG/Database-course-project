from django.contrib import admin
from beer_app.models import Style, Beer, Shop, Brewery, BeerBrewery, Profile


class ProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'image', 'beer']


admin.site.register(Profile, ProfileAdmin)
admin.site.register(Style)
admin.site.register(Beer)
admin.site.register(Shop)
admin.site.register(Brewery)
admin.site.register(BeerBrewery)
