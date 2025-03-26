# Fast-food restorani uchun BackEnd API 🍔

## Loyahning maqsadi 🎯
- boror bir fastfood retorani uchun menyularni ko'rish va ovqatlarga buyurtma berish uchu imkonyatini beruvchi loyhaning backend API

## Funksional talablar:
- Barcha taomlar category-lar bo'lishi kerak. Misol, burgerlar , vaho kazo.
- Harbir taom biror categoryga mansub bo'lishi kerak.
- taomning 1 ta rasmi, nomi narxi, description bo'lishi kerak.
- Foydalanuvchi ro'yhatdan o'tmagan holatda ham category va taomlarni ko'rishi kerak
- Foydalanuvchi email va name bilan ro'yhatdan o'tadi
- Progilga kirish email orqali bo'ladi
- Foydalanuvchio savatga mahsulotlar qo'sha olishi kerak
- Foydalanuvchi bir nechta mahsulotlarni zakaz qila olishi kerak
- Foydalanuvchi profilida o'z zakazlarini tarixini ko'rishi kerak
- Foydalanuvchi profilini yangilay olishi kerak

## Nofunksional talablar
- Tezlik 
- Xavsizlik
- Kengaya oladigan bo'lish kerak

## Database: models 🗂️

1. Category:
- id
- name
- create_at
- update_at

2. Food:
- id
- name
- price
- description
- imageUrl
- category_id (FK)
- create_at
- update_at

3. User:
- id
- name
- phonNumber
- email
- imageUrl
- create_at
- update_at

4. Orders:
- id
- user_id
- create_at
- total_price
- user_id (FK)

5. ordersItem:
- count
- order_id (FK)
- food_id (FK)

