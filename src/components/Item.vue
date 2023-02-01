<script setup>
import { ref, defineProps, defineEmits } from "vue";
import DB from "../services/DB";

/**
 * Permet de définir des "accessoires" pour le composant, on définit item
 */
const props = defineProps({
  item: Object,
});

let quantity = ref(props.item.quantity);

/**
 * Modifie la quantité d'un produit et sauvegarde en localStorage
 */
function updateQuantity(){
  let newQuantity = parseInt(quantity.value);
  props.item.quantity = newQuantity;
  DB.saveItems();
}

/**
 * Permet de définir les événements que notre composant peut émettre
 */
const emits = defineEmits(["delete"]);

</script>
<template>
    <div class="row main align-items-center">
      <div class="col-2">
        <img
          class="img-fluid"
          v-bind:src="item.image"
        />
      </div>
      <div class="col">
        <div class="row text-muted">{{item.category}}</div>
        <div class="row">{{item.name}} </div>
      </div>
      <div class="col">
        <select id="quantity" v-model="quantity" v-on:change="updateQuantity()">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
      <div id="price" value='${data.price}' class="col">&euro; {{item.price}}</div>
      <div>
        <a href="#" class="destroy" @click="emits('delete', item.id)">
          <i class="fa-solid fa-circle-xmark"></i>
        </a>
      </div>
    </div>
</template>

<style scoped></style>