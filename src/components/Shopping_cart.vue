<script setup>
import { createApp, ref, render } from 'vue';
import Item from './Item.vue';
import DB from '../services/DB';

const items = ref(DB.getItems());

// déclaration des variables 

let itemsPrices = ref(81.5);
let deliveryPrice = ref(0);
let code = ref("");
let discount = ref(0);
let count = ref(3);
let finalPrice = itemsPrices;

/**
 * Permet de calculer le prix final en fonction de la discount et du delivery
 */
function setFinalPrice(){
  if(itemsPrices > 0){
    if(code.value === 'promo' || code.value ==='kdo'){
      discount = (itemsPrices +  parseInt(deliveryPrice.value)) * 0.1
    }else{
      discount = 0;
    }
    finalPrice = (itemsPrices +  parseFloat(deliveryPrice.value)) - discount;
    console.log(finalPrice);
  }else{
    finalPrice = 0;
  }
};

/**
 * Permet de supprimer un item en fonction de son id
 * @param {*} id 
 */
const deleteOneById = (id) => {
  items.value.splice(items.value.findIndex((item) => item.id == id),1);
  renderItemsCount();
  DB.saveItems();
};

/**
 * Permet de calculer le prix total des items 
 */
const itemsPrice = () => {
  itemsPrices = 0;
  items.value.forEach(item => {
    itemsPrices = itemsPrices + (item.price * item.quantity);
  });
  setFinalPrice();
};

/**
 * Permet de compter le nombre d'items
 */
function renderItemsCount(){
  let counter = 0;
  items.value.forEach(item =>{
    counter = counter + item.quantity;
  });
  count = counter;
}

itemsPrice();
setFinalPrice();
renderItemsCount();


</script>
<template>
  <body>
    <div class="card">
        <div class="row">
          <div class="col-md-8 cart">
            <div class="title">
              <div class="row">
                <div class="col">
                  <h4><b>Shopping Cart</b></h4>
                </div>
                <div id='count' class="col align-self-center text-right text-muted">
                  {{count + " ITEMS"}}
                </div>
              </div>
            </div>
            <div id="item" class="row border-top border-bottom">
              <item
                    v-for="item in items"
                    :key ="item.id"
                    :item="item"
                    @delete="deleteOneById"
                    v-on:change="itemsPrice"
                    v-on:delete="itemsPrice"
                    @change="renderItemsCount()"
                  />
            </div>
            <div class="back-to-shop">
              <a href="#">&leftarrow;</a
              ><span class="text-muted">Back to shop</span>
            </div>
          </div>
          <div class="col-md-4 summary">
            <div>
              <h5><b>Summary</b></h5>
            </div>
            <hr />
            <div class="row">
              <div id="count" class="col" style="padding-left: 0"> {{count + " items"}} </div>
              <div class="col text-right">&euro; {{ itemsPrices }}</div>
            </div>
            <form action="#">
              <p>SHIPPING</p>
              <select class="delivery" v-model="deliveryPrice" v-on:change="setFinalPrice();">
                <option class="text-muted" value="0" disabeld selected>
                  Choose your delivery
                </option>
                <option class="text-muted" value="5">
                  Standard-Delivery- &euro;5.00
                </option>
                <option class="text-muted" value="10">
                  Express-Delivery- &euro;10.00
                </option>
              </select>
              <p>GIVE CODE [10% reduction]</p>
              <input class="coupon" type="text" placeholder="Your code here " v-model="code" v-on:keyup.enter="setFinalPrice()"/>
            </form>
            <div
              class="row"
              style="border-top: 1px solid rgba(0, 0, 0, 0.1); padding: 2vh 0">
              <div class="col">TOTAL PRICE</div>
              <div id='finalPrice' class="col text-right" >&euro; {{ finalPrice }}</div>
            </div>
            <button class="btn">CHECKOUT</button>
          </div>
        </div>
      </div>
    </body>
</template>

<style scoped>
</style>
