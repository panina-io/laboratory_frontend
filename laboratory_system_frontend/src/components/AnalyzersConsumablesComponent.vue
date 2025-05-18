<template>
    <tr class="components" @dblclick="Edit">
        <td>{{ item.box_data.cons_type_name }}</td><td>{{ item.box_data.manufacturer_name }}</td><td>{{ item.box_data.lot }}</td>
        <td :style="getRowStyle(item.box_data.expiration_date)">{{ formatDate(item.box_data.expiration_date) }}</td><td>{{ item.box_data.balance }}</td>
        <td>{{ item.move_name }}</td><td>{{ item.sink_name }}</td><td>{{ item.box_data.note }}</td>
    </tr>
    <analyzers-consumables-edit-form
        v-if="edit_mode" 
        :item="item"
        :tmp="item.id"
        @edit_item="edit_item"
        @cancel_edit="cancel_edit"/>
</template>

<script>
    import dayjs from 'dayjs'
    import AnalyzersConsumablesEditForm from './AnalyzersConsumablesEditForm.vue'
    export default{
        components: {
            AnalyzersConsumablesEditForm
        },
        props: {
            item: {type: Object}
        },
        data() {
           return {
            edit_mode: false
            }  
        },
        emits: ['edit_item'],
        methods: {
            Edit() {
                this.edit_mode = true
            },
            edit_item(box_id, new_expenditure, new_balance, new_move, new_source, new_sink, new_note) {
                this.$emit("edit_item", box_id, new_expenditure, new_balance, new_move, new_source, new_sink, new_note)
                this.edit_mode = false
            },
            cancel_edit() {
                this.edit_mode = false
            },
            getRowStyle(expiration_date) {
                const currentDate = new Date()
                const expiry = new Date(expiration_date)
                const diffInMillis = expiry - currentDate;
                const diffInDays = Math.floor(diffInMillis / (1000*60*60*24));
                if (diffInDays > 180) {
                    return { backgroundColor: '#9ACD32' };  // Более 6 месяцев
                } else if (diffInDays > 90) {
                    return { backgroundColor: 'yellow' };  // Более 3 месяцев
                } else if (diffInDays >= 0) {
                    return { backgroundColor: '#FF8C00' };  // Менее 3 месяцев
                } else {
                    return { backgroundColor: '#D1212D' };  // Просрочено
                }
            },
            formatDate(date) {
                return dayjs(date).format('DD.MM.YYYY');
                },
        },
    }
</script>

