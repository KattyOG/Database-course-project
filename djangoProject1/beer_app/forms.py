from django import forms
from beer_app.models import Style, Brewery
from django.contrib.auth.models import User
from .models import Profile, Beer, BeerBrewery
from django.forms import TextInput, Select, NumberInput


class BeerAddForm(forms.ModelForm):
    class Meta:
        model = Beer
        fields = ('name', 'style_id', 'abv', 'ibu', 'image')

        widgets = {
            "name": TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Название пива',
            }),
            "style_id": Select(attrs={
                'class': 'form-control',
                'placeholder': 'Стиль пива',
            }),
            "abv": NumberInput(attrs={
                'class': 'form-control',
                'label': 'Крепость',
            }),
            "ibu": NumberInput(attrs={
                'class': 'form-control',
                'label': 'Горечь',
            }),
        }


class BeerAddBrewery(forms.ModelForm):
    class Meta:
        model = BeerBrewery
        fields = ('beer_id', 'brewery_id',)

        widgets = {
            "beer_id": Select(attrs={
                'class': 'form-control',
                # 'placeholder': 'Пиво',
            }),
            "brewery_id": Select(attrs={
                'class': 'form-control',
                'placeholder': 'Пивоварня',
            }),
        }

class UserEditForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email')

        widgets = {
            "username": TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Логин',
            }),
            "first_name": TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Имя',
            }),
            "last_name": TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Фамилия',
            }),
            "email": TextInput(attrs={
                'class': 'form-control',
                'label': 'Почта',
            }),
        }


class ProfileEditForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ('image',)


class UserRegistrationForm(forms.ModelForm):
    password = forms.CharField(label='Пароль', widget=forms.PasswordInput(attrs={'class': 'form-control', 'placeholder': 'Пароль'}))
    password2 = forms.CharField(label='Повторите пароль', widget=forms.PasswordInput(attrs={'class': 'form-control', 'placeholder': 'Повторите пароль'}))

    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email')

        widgets = {
            "username": TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Логин',
            }),
            "first_name": TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Имя',
            }),
            "last_name": TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Фамилия',
            }),
            "email": TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Почта',
            }),
        }

    def clean_password2(self):
        cd = self.cleaned_data
        if cd['password'] != cd['password2']:
            raise forms.ValidationError('Пароли не совпадают')
        return cd['password2']


class SearchForm(forms.Form):
    STYLE_CHOICES = list(Style.objects.all().distinct().values_list())
    STYLE_CHOICES.insert(0, ["", ""])
    COUNTRY_CHOICES = list(Brewery.objects.values_list('country', 'country').distinct('country'))
    COUNTRY_CHOICES.insert(0, ["", ""])
    ABV_CHOICES = (
        ("", ""),
        ("0", 0),
        ("1", 1), ("2", 2),
        ("3", 3), ("4", 4),
        ("5", 5), ("6", 6),
        ("7", 7), ("8", 8),
        ("9", 9), ("10", 10),
        ("11", 11), ("12", 12),
    )
    IBU_CHOICES = (
        ("", ""),
        ("0", 0), ("1", 1), ("2", 2),
        ("3", 3), ("4", 4), ("5", 5),
        ("6", 6), ("7", 7), ("8", 8),
        ("9", 9), ("10", 10), ("11", 11),
        ("12", 12), ("13", 13), ("14", 14),
        ("15", 15), ("16", 16), ("17", 17),
        ("18", 18), ("19", 19), ("20", 20),
        ("21", 21), ("22", 22), ("23", 23),
        ("24", 24), ("25", 25), ("26", 26),
        ("27", 27), ("28", 28), ("29", 29),
        ("30", 30), ("31", 31), ("32", 32),
        ("33", 33), ("34", 34), ("35", 35),
        ("36", 36), ("37", 37), ("38", 38),
        ("39", 39), ("40", 40), ("41", 41),
        ("42", 42), ("43", 43), ("44", 44),
        ("45", 45), ("46", 46), ("47", 47),
        ("48", 48), ("49", 49), ("50", 50),
        ("51", 51), ("52", 52), ("53", 53),
        ("54", 54), ("55", 55), ("56", 56),
        ("57", 57), ("58", 58), ("59", 59),
        ("60", 60), ("61", 61), ("62", 62),
        ("63", 63), ("64", 64), ("65", 65),
        ("66", 66), ("67", 67), ("68", 68),
        ("69", 69), ("70", 70), ("71", 71),
        ("72", 72), ("73", 73), ("74", 74),
        ("75", 75), ("76", 76), ("77", 77),
        ("78", 78), ("79", 79), ("80", 80),
        ("81", 81), ("82", 82), ("83", 83),
        ("84", 84), ("85", 85), ("86", 86),
        ("87", 87), ("88", 88), ("89", 89),
        ("90", 90), ("91", 91), ("92", 92),
        ("93", 93), ("94", 94), ("95", 95),
        ("96", 96), ("97", 97), ("98", 98),
        ("99", 99), ("100", 100)
    )

    input_field = forms.CharField(label="INPUT", max_length=100, required=False)
    style_choice = forms.ChoiceField(label="STYLE", choices=STYLE_CHOICES, required=False)
    abv_choice = forms.ChoiceField(label="ABV", choices=ABV_CHOICES, required=False)
    ibu_choice = forms.ChoiceField(label="IBU", choices=IBU_CHOICES, required=False)
    country_choice = forms.ChoiceField(label="COUNTRY", choices=COUNTRY_CHOICES, required=False)