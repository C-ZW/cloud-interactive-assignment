##　 Environment

    node 16.4.1
    typescript 4.3.5
    os windows11

## setup

```bash
npm i
npm run build
npm run start
```

If something wrong, just execute

```
node ./dist/index.js
```

final output

```
Initial user1 and user2
Initial three token products, and one subscription product

User1 buy a token, productId: 1
User1 buy a token, productId: 2
User1 balance: 300
All balance: 300

User2 buy a token, productId: 3
User2 balance: 300
All balance: 600

user1 transfer 100 to user2

after user1 transfer 100 to user2
User1 balance: 200
User2 balance: 400
All balance: 600

after user1 transfer 1000 to user2 (user1 balance < 1000, nothing happen)
User1 balance: 200
User2 balance: 400
All balance: 600
```
