<script>
    import { goto } from "$app/navigation";
    import Icon from "@iconify/svelte";
    import { supabase } from "$lib/supabaseClient.js";
    import { currentNote } from "$lib/store/currentNote.js";
    import { notes } from "$lib/store/notes.js";
    import { fly } from "svelte/transition";
    export let note;

    console.log("notes", note);
    let noteDate = note.created_at;
    const date = new Date(noteDate);
    const formattedDate = date.toLocaleString();

    const editNote = async (note) => {
        $currentNote = note;
        goto("/edit");
        console.log("current", $currentNote);
    };
    const deleteNote = async () => {
        console.log("deleting");
        const { error } = await supabase
            .from("notes")
            .delete()
            .eq("id", note.id);
        console.log("del", error);
           $notes = $notes.filter(object => object.id !== note.id);

    };
</script>

<div class="rounded w-full">
    <div
        class="w-full h-64 flex flex-col justify-between dark:bg-gray-800 dark:border-gray-700 rounded-lg border border-gray-400 mb-6 py-5 px-4 bg-gray-200"
        transition:fly
    >
        <div>
            <h4 class="text-gray-800 dark:text-gray-100 font-bold mb-3">
                {note.noteTitle}
            </h4>
            <p class="text-gray-800 dark:text-gray-100 text-sm">
                {note.note}
            </p>
        </div>
        <div>
            <div
                class="flex items-center justify-between text-gray-800 dark:text-gray-100"
            >
                <p class="text-sm">{formattedDate}</p>
                <div class="flex gap-3 md:gap-5 items-center">
                    <div on:click={() => deleteNote()}>
                        <Icon
                            icon="mdi:delete"
                            class="text-rose-500 text-2xl hover:cursor-pointer"
                        />
                    </div>
                    <button
                        on:click={() => editNote(note)}
                        class="w-8 h-8 rounded-full bg-gray-800 dark:bg-gray-100 dark:text-gray-800 text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                        aria-label="edit note"
                        role="button"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="icon icon-tabler icon-tabler-pencil"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <path
                                d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4"
                            />
                            <line x1="13.5" y1="6.5" x2="17.5" y2="10.5" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
