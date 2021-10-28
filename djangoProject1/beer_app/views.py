from .models import Style
from rest_framework.response import Response
from rest_framework.views import APIView
from django.views.generic import TemplateView
from django.http.response import HttpResponse
from django.shortcuts import render, get_object_or_404
from random import randint
from beer_app.models import Beer, BeerBrewery, Profile
from django.contrib.auth.models import Group
from .forms import SearchForm, UserRegistrationForm
from .forms import UserRegistrationForm, UserEditForm, ProfileEditForm, BeerAddForm, BeerAddBrewery
from django.contrib.auth.decorators import login_required


class MyBeer:
    def __init__(self, name, url):
        self.name = name
        self.url = url


class ProfileBeer:
    def __init__(self, image, url):
        self.image = image
        self.url = url


class AllBeerInfo:
    def __init__(self, name, abv, ibu, style, brewery_name, country, city, brewery_adress, image, grade=0):
        self.name = name
        self.abv = abv
        self.ibu = ibu
        self.style = style
        self.brewery_name = brewery_name
        self.country = country
        self.city = city
        self.brewery_adress = brewery_adress
        self.image = image
        self.grade = grade


def beer_page(request, id, name, grade=0):
    beer_obj = Beer.objects.get(id=id, name=name)
    brewery_obj = list(BeerBrewery.objects.filter(beer_id=id, beer_id__name=name))
    if brewery_obj:
        data = AllBeerInfo(beer_obj.name, beer_obj.abv, beer_obj.ibu, beer_obj.style_id,
                       brewery_obj[0].brewery_id.name, brewery_obj[0].brewery_id.country,
                       brewery_obj[0].brewery_id.city, brewery_obj[0].brewery_id.address,
                       beer_obj.image, grade
                       )
    else:
        data = AllBeerInfo(beer_obj.name, beer_obj.abv, beer_obj.ibu, beer_obj.style_id,
                       None, None, None, None,
                       beer_obj.image, grade
                       )
    if grade:
        # print(grade)
        user = Profile.objects.get(user_id=request.user.id)
        user.beer[str(id)] = str(grade)
        # print(len(user.beer))
        user.save()
        # user.profile.grade = grade
        # user.profile.beer_id = id
        # new_grade = Profile.objects.create(image=None, grade=grade, beer_id_id=id, user_id=request.user.id)
        # new_grade.save()

    return render(request, 'BeerPage.html', {'data': data})


def list_page(request):
    dict = request.GET.dict()
    beer_dict = {}
    beers = []

    if 'input_field' in dict.keys() and dict['input_field'] != '':
        beer_dict['name__icontains'] = dict['input_field']
    if 'abv_choice' in dict.keys() and dict['abv_choice'] != '':
        beer_dict['abv'] = dict['abv_choice']
    if 'ibu_choice' in dict.keys() and dict['ibu_choice'] != '':
        beer_dict['ibu'] = dict['ibu_choice']
    if 'style_choice' in dict.keys() and dict['style_choice'] != '':
        beer_dict['style_id'] = dict['style_choice']
    if 'country_choice' in dict.keys() and dict['country_choice'] != '':
        beer_dict['beer_relate__brewery_id__country'] = dict['country_choice']

    beer_in = list(Beer.objects.filter(**beer_dict).values_list())
    for i in range(len(beer_in)):
        if request.user.is_authenticated:
            user = Profile.objects.get(user_id=request.user.id)
            list_keys = user.beer.keys()
            if str(beer_in[i][0]) in list_keys:
                beers.append(MyBeer(beer_in[i][1], '/' + 'beer' + '/' + str(beer_in[i][0]) + '/' + beer_in[i][1] + '/' + user.beer[str(beer_in[i][0])] + '/'))
            else:
                beers.append(MyBeer(beer_in[i][1], '/' + 'beer' + '/' + str(beer_in[i][0]) + '/' + beer_in[i][1] + '/'))
        else:
            beers.append(MyBeer(beer_in[i][1], '/' + 'beer' + '/' + str(beer_in[i][0]) + '/' + beer_in[i][1] + '/'))

    return render(request, 'ListPage.html', {'data': beers})


def search_page(request):
    form = SearchForm()
    beers = []
    urls = []

    i = 0
    while i != 8:
        try:
            beer = get_object_or_404(Beer, pk=randint(1, 5917))
            if beer not in beers:
                beers.append(beer)
                if request.user.is_authenticated:
                    user = Profile.objects.get(user_id=request.user.id)
                    list_keys = user.beer.keys()
                    if str(beer.id) in list_keys:
                        urls.append('/' + 'beer' + '/' + str(beer.id) + '/' + beer.name + '/' + user.beer[str(beer.id)] + '/')
                    else:
                        urls.append('/' + 'beer' + '/' + str(beer.id) + '/' + beer.name + '/')
                else:
                    urls.append('/' + 'beer' + '/' + str(beer.id) + '/' + beer.name + '/')
                i += 1
        except:
            pass

    return render(request, 'SearchPage.html', {'beer1': beers[0], 'beer2': beers[1], 'beer3': beers[2],
                                               'beer4': beers[3], 'beer5': beers[4], 'beer6': beers[5],
                                               'beer7': beers[6], 'beer8': beers[7], 'form': form,
                                               'url1': urls[0], 'url2': urls[1], 'url3': urls[2],
                                               'url4': urls[3], 'url5': urls[4], 'url6': urls[5],
                                               'url7': urls[6], 'url8': urls[7]})


def main_page(request):
    return render(request, 'MainPage.html')


def profile_page(request):
    user = Profile.objects.get(user_id=request.user.id)
    likes = len(user.beer)
    list_id_beer = user.beer.keys()
    beers = []

    for beer in list_id_beer:
        beer_name = Beer.objects.get(id=beer).name
        beer_image = Beer.objects.get(id=beer).image.url
        grade = user.beer[str(beer)]
        beers.append(ProfileBeer(beer_image,
                                 '/' + 'beer' + '/' + str(beer) + '/' + beer_name + '/' + str(grade)))

    return render(request, 'ProfilePage.html', {'likes': likes, 'data': beers})


def add_beer(request):
    if request.method == 'POST':
        beer_form = BeerAddForm(request.POST, files=request.FILES)
        # brewery_form = BeerAddBrewery(request.POST.,)
        if beer_form.is_valid():
            # beer_obj = list(Beer.objects.order_by('id').all())[-1]
            # id = beer_obj.id
            beer_form.save()
            # brewery_form.save()
    else:
        beer_form = BeerAddForm()
        # brewery_form = BeerAddBrewery()

    return render(request, 'BeerAdd.html', {'beer_form': beer_form})


# def add_brewery(request):
#     id = 6017
#     if request.method == 'POST':
#         brewery_form = BeerAddBrewery(request.POST, initial={'beer_id': str(id)})
#
#         if brewery_form.is_valid():
#             # brewery_form['beer_id'].value()
#             print(brewery_form.fields['beer_id'])
#             # brewery_form.fields['beer_id'].disa
#             brewery_form.cleaned_data.get(str(id))
#             print(brewery_form['beer_id'].value())
#
#             # brewery_form.beer_id.value = id
#             brewery_form.save()
#     else:
#         brewery_form = BeerAddBrewery()
#     return render(request, 'BreweryAdd.html', {'brewery_form': brewery_form, 'id': id})


def register(request):
    if request.method == 'POST':
        user_form = UserRegistrationForm(request.POST)
        if user_form.is_valid():
            # Create a new user object but avoid saving it yet
            new_user = user_form.save(commit=False)
            # Set the chosen password
            new_user.set_password(user_form.cleaned_data['password'])
            # Save the User object
            new_user.save()
            new_user.groups.add(Group.objects.get(name='Registered'))
            return render(request, 'registration/register_done.html', {'new_user': new_user})
    else:
        user_form = UserRegistrationForm()
    return render(request, 'registration/register.html', {'user_form': user_form})


@login_required
def edit(request):
    if request.method == 'POST':
        user_form = UserEditForm(instance=request.user, data=request.POST)
        profile_form = ProfileEditForm(instance=request.user.profile, data=request.POST, files=request.FILES)
        if user_form.is_valid() and profile_form.is_valid():
            user_form.save()
            profile_form.save()
    else:
        user_form = UserEditForm(instance=request.user)
        profile_form = ProfileEditForm(instance=request.user.profile)
    return render(request, 'registration/edit.html', {'user_form': user_form, 'profile_form': profile_form})


def view_404(request, *args, **kwargs):
    return render(request, 'MainPage.html')
# import os
# from beer_app.models import Beer
# for i in range(1, 6000):
#     try:
#         if os.path.exists('C:\\Users\\mir80\\Downloads\\Telegram Desktop\\beer_parser_quality\\' + str(i) + ".png"):
#             beers = Beer.objects.get(id=i)
#             beers.image = 'images/' + str(i) + ".png"
#             beers.save()
#         else:
#             beers = Beer.objects.get(id=i)
#             beers.image = 'images/' + "beer_not_found.png"
#             beers.save()
#     except:
#         pass

    # a = Beer.objects.all().select_related('beer_id', 'brewery_id')
    # co = BeerBrewery.objects.filter(brewery_id__country='ss')
    # co1 = BeerBrewery.objects.filter(beer_id__name='ff')
    # co = Beer.objects.filter(ber)
