/**
This tooltip module is designed to work only .lendingtree.com domain. For other domain, please disable the same.
*/
<template>
    <span>
    <a :href="href" @click="handleClick()" class="glyphicon glyphicon-question-sign calc-question" :target="target"></a>

    <!-- use the modal component, pass in the prop -->
    <modal v-if="ShowModal" @close="ShowModal = false">
        <!--
          you can use custom content here to overwrite
          default content
        -->
        <div slot="body" v-html="ModalBody"></div>
    </modal>
    </span>
</template>
<script>
    import Modal from './modal.vue'

    export default {
        props: {
            tooltipLink: {
            }
        },
        data () {
            return {
                ShowModal: false,
                ModalBody: '',
                href: 'javascript: handleClick();',
                target: ''
            }
        },
        components: {
            Modal
        },
        methods: {
            handleClick: function () {
                if (this.target == "") {
                    this.ShowModal = true;
                    return false;
                }
            },
            fetchData: function () {
                var self = this;
                if (typeof self.tooltipLink != "undefined")
                {
                    var xhr = new XMLHttpRequest();
                    xhr.open('GET', "/glossary/what-is-" + self.tooltipLink);
                    xhr.setRequestHeader("x-requested-with", "XMLHttpRequest");
                    xhr.onload = function () {
                        self.ModalBody = xhr.responseText;
                    }
                    xhr.send()
                }
            }
        },
        created: function () {
            if (window.location.hostname.indexOf(".lendingtree") > 0) {
                this.fetchData()
            } else {
                this.href = "https://www.lendingtree.com/glossary/what-is-" + this.tooltipLink;
                this.target = "_blank";
            }
        }
    }
</script>