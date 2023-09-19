<script>
    import "../app.css";
    import Icon from "@iconify/svelte";
    import { goto } from "$app/navigation";
    import Nav from "../lib/components/Nav.svelte";
    import { currentUser } from "$lib/store/authState.js";
</script>

<div class="relative px-3 w-full max-w-7xl bg-gray-100 h-full min-h-screen">
<h1 class="fixed left-2  top-2 border-violet-400 rounded-md border bg-violet-100 p-2 z-10 text-violet-600 font-extrabold text-2xl">Ron Docs</h1>
    <div class="fixed right-1 top-0 z-10 ">
        <Nav />
    </div>
    <div class="pt-32
    ">
    <slot />
    </div>
    {#if $currentUser}

    <div class="fixed right-6 bottom-2 z-50 bg-violet-500 p-3 rounded-md cursor-pointer hover:bg-violet-600 ease-in duration-100 delay-150" on:click={()=>goto('/new')}>
        <Icon icon="mdi:note-plus" class=" text-gray-100  text-3xl"  />
    </div>
    {/if}
</div>
