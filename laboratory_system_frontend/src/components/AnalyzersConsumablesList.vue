<template>
    <div>
    <h1 class="section-name">
        Расходники для анализаторов
    <button class="add-item" @click="Add">
            +Добавить
        </button>
    </h1>
    <analyzers-consumables-add-form v-if="add_mode" @cancel_add="cancel_add" @add_item="add_item"/>
    <table class="components-list">
        <tr>
            <th class="head">
                Тип расходника
            </th>
            <th class="head">
                Производитель
            </th>
            <th class="head">
                Анализатор
            </th>
            <th class="head">
                Лот/серия
            </th>
            <th class="head">
                Срок годности
            </th>
            <th class="head">
                Количество
            </th>
            <th class="head">
                Состояние
            </th>
            <th class="head">
                Место хранения
            </th>
            <th class="head">
                Примечание
            </th>
          </tr>
        <analyzers-consumables-component
                v-for="item in latestMove"
                :item="item"
                :key="item.id"
                @edit_item="edit_item"/>
        </table>
</div>
</template>

<script>
    import AnalyzersConsumablesComponent from './AnalyzersConsumablesComponent.vue';
    import AnalyzersConsumablesAddForm from './AnalyzersConsumablesAddForm.vue';
    export default{
        components: {
            AnalyzersConsumablesComponent,
            AnalyzersConsumablesAddForm
        },
        data(){
            return {
                items: [],
                add_mode: false,
            }
        },
        computed: {
            latestMove() {
                const latest = new Map();
                for (const move of this.items) {
                    const lotId = move.box_data.id;
                if (
                    !latest.has(lotId) ||
                    new Date(move.add_time) > new Date(latest.get(lotId).add_time)
                ) {
                latest.set(lotId, move);
                }
                }
            return Array.from(latest.values());
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
            async editData(box_id, new_expenditure, new_balance, new_move, new_source, new_sink, new_note) {
                try {
                    await this.$http.post("analyzersconsumables_move/",
                        {box: box_id, expenditure: new_expenditure, move: new_move, sourse: new_source, sink: new_sink, note: new_note},
                         {headers: {authorization: `Bearer ${localStorage.access_token}`,}},
                    await this.$http.patch("analyzersconsumables_move/"+box_id+"/",{
                        balance: new_balance,}, {headers: {
                        authorization: `Bearer ${localStorage.access_token}`
                    }})
                    );
                } catch (error) {
                    console.log(error);
                }
            },
            edit_item(box_id, new_expenditure, new_balance, new_move, new_source, new_sink, new_note) {
                this.editData(box_id, new_expenditure, new_balance, new_move, new_source, new_sink, new_note)
                this.refresh()
            },
            Add () {
                this.add_mode=true
            },
            add_item() {
                this.add_mode = false
                this.refresh()
            },
            refresh() {
                setTimeout(() => { this.getData(); },500);
            },
            cancel_add() {
                this.add_mode = false
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

