from django.shortcuts import render, redirect, get_object_or_404, HttpResponse
from .models import Item, Order, Orderupdate
from math import ceil
from .forms import Orderform, Trcakerform
from django.contrib import messages
import json


# Create your views here.
def home(request):
    allprods = []
    categories = Item.objects.values('category')
    cats = {prod['category'] for prod in categories}
    for cat in cats:
        products = Item.objects.filter(category = cat)
        n = len(products)
        nslides = n//4 + ceil(n/4- n//4)
        allprods.append([products, range(1, nslides)])

    context = {'allprods':allprods}     
    return render(request,'home.html', context)

# Checkout views
def checkout(request):
    form = Orderform(request.POST or None)
    if form.is_valid():
        order= form.save()
        order_update = Orderupdate(order_id = order.id, update_desc="Your update has been placed")
        order_update.save()
        id = order.id
        messages.success(request, f"Your order has been sucessfully received. Please use your order id {id} to track your order ")
        return redirect('/')
    return render(request, 'checkout.html', {'form':form})

# Tracker views
def tracker(request):
   
    if request.method == 'POST':
        form = Trcakerform(request.POST)
        if form.is_valid():
            orderId = form.cleaned_data['order_id']
            email = form.cleaned_data['email']
            try:
                order = Order.objects.filter(id=orderId, email=email)
                if len(order)>0:
                    update = Orderupdate.objects.filter(order_id=orderId)
                    updates = []
                    for item in update:
                        updates.append({'text': item.update_desc, 'time': item.update_date})
                        response = json.dumps(updates, default=str)
                    print(response)
                    return HttpResponse(response)
                else:
                    return HttpResponse('else')
            except Exception as e:
                return HttpResponse('exception',e)

        return render(request, 'tracker.html')
    if request.method == 'GET':
        form = Trcakerform()
        return render(request, 'tracker.html', {'form':form})