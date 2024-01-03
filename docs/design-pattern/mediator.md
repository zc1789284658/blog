# 中介者模式
> 当系统中存在多个对象，并且这些对象的管理非常复杂时，难免会形成网状的交叉引用，这种多对多的关系耦合度非常高，并且随着数量增加，其关系网复杂度升高地越来越快。中介者模式就是管理这些对象之间管理的一种模式，通过一个中间对象，使多对多的管理变成一对多的关系。

### 场景
- 游戏场景，某个单独个体需要维护它的队友/敌人的信息，当队友/地方信息非常多时，处理起来非常麻烦。如某个个体挂掉了，需要通知到它的所有队友/敌人，这种与个体关系不紧密（系统上的操作）的操作最好交由中介者对象处理，此外，还有某些循环不能解决的操作时，只能通过中介者进行处理。

```js
class Mediator{
    constructor(){
        this.shop;
        this.buyers = [];
        this.sellers = [];
    }
    addBuyers(buyers){
        this.buyers = this.buyers.concat(buyers)
    }
    addSellers(sellers){
        this.sellers = this.sellers.concat(sellers)
    }
    getBuyers(){
        console.log(this.buyers)
    }
    getSellers(){
        console.log(this.sellers)
    }
    sell(seller){
        seller.sell()
    }
    buy(buyer){
        buyer.buy()
    }
}

class Seller{
    constructor(name='seller'){
        this.name = name
    }
    sell(){
        //需要耦合
        console.log('sell :'+ this.name)
    }
}

class Buyer{
    constructor(name='buyer'){
        this.name = name
    }
    buy(){
        //需要耦合
        console.log('buy :'+ this.name)
    }
}

var mediator = new Mediator()
var buyer1 = new Buyer('买家1')
var buyer2 = new Buyer('买家2')
var seller1 = new Seller('卖家1')
var seller2 = new Seller('卖家2')

mediator.addBuyers([buyer1,buyer2])
mediator.addSellers([seller1,seller2])

mediator.sell(seller1)
mediator.sell(seller2)
mediator.buy(buyer1)
mediator.buy(buyer2)
mediator.getBuyers()
mediator.getSellers()

/** 
sell :卖家1
sell :卖家2
buy :买家1
buy :买家2
[ Buyer { name: '买家1' }, Buyer { name: '买家2' } ]
[ Seller { name: '卖家1' }, Seller { name: '卖家2' } ]
*/
```

> 中介者模式时迎合迪米特法则的一种实现。迪米特法则也叫最小知识原则，是指一个对象应该尽可能少地了解另外的对象。如果对象之间耦合性太高，一个对象发生改变后，难免会影响到其他对象。在中介者模式里，对象之间几乎不知道对方的存在，他们只能通过中介者进行交互。

不过中介者也存在一些缺点：
- 系统中会增加一个中介者对象，通常中介者会很大。将对象之间的维护复杂度转移到了中介者对象身上。
- 对象之间并不一定需要解耦，需要根据场景进行设计。