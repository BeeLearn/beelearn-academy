<script setup lang="ts">
    import {Menu, MenuButton, MenuItems, MenuItem} from "@headlessui/vue";

    import type User from "~/lib/api/models/user.model";
    import type Comment from "~/lib/api/models/comment.model";

    type ThreadCommentMenuProps = {
        user: Partial<User>,
        comment: Comment,
    }

    defineProps <ThreadCommentMenuProps>();
    defineEmits<{
        (event: 'delete', comment: Comment): Promise<void>,
    }>();

    const onDelete = function(){

    }
</script>
<template>
    <Menu
        as="div" 
        class="relative">
        <MenuButton as="button">
            <UnoIcon class="i-mdi:dots-vertical text-lg" />
        </MenuButton>
        <MenuItems
            as="div" 
            class="absolute -left-34 flex flex-col divide-y p-2 w-40  bg-white rounded-xl shadow z-10">
            <MenuItem 
                as="div"
                v-if="comment.user.id === user.id && !comment.is_deleted"
                class="flex space-x-2 p-2 items-center text-red-500"
                @click="$emit('delete', comment)">
                <UnoIcon class="i-mdi:delete text-xl" />
                <p>Delete</p>
            </MenuItem>
            <MenuItem 
                as="div"
                class="flex space-x-2 p-2 items-center">
                <UnoIcon class="i-mdi:flag text-xl text-stone-500" />
                <p>Report</p>
            </MenuItem>
        </MenuItems>
    </Menu>
</template>