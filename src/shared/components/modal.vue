<!-- template for the modal component -->
<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-body">
            <a class="modal-close" @click="$emit('close')">&#215;</a>
            <slot name="body">
              default body
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
    beforeCreate: function (el) {
        document.body.className = document.body.className + " modal-open";
    },
    destroyed: function (el, done) {
        document.body.className = document.body.className.replace("modal-open","").trim();
    }
}
</script>