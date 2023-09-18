<script>
    import Note from "../../lib/components/Note.svelte";
    import { notes } from "$lib/store/notes.js";

    export let data;
    $notes = data.notes
    console.log($notes)



</script>
<div>
</div>

<div class="mx-auto container py-20 px-6 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 place-items-center items-center w-full justify-items-center mt-2 ">
    {#each $notes as note}
        <Note {note} />
    {/each}
</div>
