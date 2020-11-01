from django.db import models
from django.utils import timezone

class Item(models.Model):
    name = models.CharField(max_length=30)
    price = models.IntegerField()
    category = models.CharField(max_length=30)
    desc = models.TextField(default="This is the default description content in the description field")
    img = models.ImageField(upload_to ="shop_images", default ="default.jpg" )
    dateposted = models.DateTimeField(default= timezone.now)

    def __str__(self):
        return f"product:{self.name}, category: {self.category} "

class Order(models.Model):
    name = models.CharField(max_length=30)
    email = models.CharField(max_length=40, default='')
    address = models.CharField(max_length=40)
    phone = models.IntegerField()
    json = models.CharField(max_length=5000, default='')

    def __str__(self):
        return f"name:{self.name}, address:{self.address}"

class Orderupdate(models.Model):
    order_id = models.IntegerField()
    update_desc = models.TextField()
    update_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.update_desc[0:20]}"

