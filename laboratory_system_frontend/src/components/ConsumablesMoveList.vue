<template>
    <div>
    <h1 class="section-name">
        Журнал движения расходников для анализаторов
    </h1>
    <table class="components-list">
        <tr>
            <th class="head">
                Тип расходника
            </th>
            <th class="head">
                Производитель
            </th>
            <th class="head">
                Серия/лот
            </th>
            <th class="head">
                Состояние
            </th>
            <th class="head">
                Расход
            </th>
            <th class="head">
                Дата изменения
            </th>
          </tr>
        <consumables-move-component
                v-for="item in items"
                    :item="item"/>
        </table>
</div>
</template>

<script>
import ConsumablesMoveComponent from './ConsumablesMoveComponent.vue'
    export default{
        components: {
            ConsumablesMoveComponent, 
        },
        data(){
            return {
                items: [],
            }
        },
        methods: {
            async getData(){
                try{
                    const response = await this.$http.get("analyzersconsumables_move/", {headers: {authorization: `Bearer ${localStorage.access_token}`}})
                    this.items = response.data
                }
                catch(error){
                    console.log(error)
                }
            },
            refresh() {
                setTimeout(() => { this.getData(); },500);
            },
        },
        created(){
            this.getData()
        }
    }
</script>

<style scoped>
div {
    text-align: center;
    text-decoration: none;
    letter-spacing: 2px;
    font-size: 17px;
    transition: color .2s;
}

td {
	padding: 10px;
	font-size: 14px;
	line-height: 10px;
	color: #444441;
	border-top: 1px solid #716561;
}

</style>

