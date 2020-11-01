from .models import Order, Orderupdate
from django import forms

class Orderform(forms.ModelForm):
    email = forms.EmailField()
    json = forms.CharField(label ='', widget=forms.HiddenInput(attrs={"value":"blank", "id":"json"}))

    class Meta:
        model = Order
        fields = ['json','name', 'email', 'phone', 'address']


class Trcakerform(forms.ModelForm):
    email = forms.EmailField(label = 'Email')
    order_id = forms.IntegerField(label="ID")

    class Meta:
        model = Orderupdate
        fields = ['order_id', 'email']

