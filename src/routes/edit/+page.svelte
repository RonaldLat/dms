<script>
    import { supabase } from "$lib/supabaseClient.js";
    import { currentUser } from "$lib/store/authState.js";
    import { currentNote } from "$lib/store/currentNote.js";

    const updatedData = {
        noteTitle: $currentNote.noteTitle,
        note: $currentNote.note
    };

    const editNote = async () => {
        const { data, error } = await supabase
            .from("notes")
            .update(updatedData)
            .eq("id", $currentNote.id)
            .select();
        console.log("error", error);
        console.log("data", data);
    };

    console.log($currentUser);
    console.log($currentNote);
</script>
<p class="text-2xl mx-auto w-full text-center italic">Edit</p>

<form class="flex-col gap-5 w-4/5 mx-auto mt-5" on:submit={editNote}>
    <div class="relative mb-3">
        <input
            bind:value={updatedData.noteTitle}
            id="title"
            type="text"
            name="title"
            class="text-gray-dark border-2 peer block w-full appearance-none rounded-md border-gray-400 px-0 py-[14px] pl-6 text-sm focus:border-gray-800 focus:outline-none focus:ring-0"
            placeholder=" "
            required
        />
        <label
            for="user_email"
            class="absolute top-4 left-6 text-gray-middle bg-white duration-300 transform -translate-y-6 transparent peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6 peer-focus:px-[4px] peer-focus:text-gray-dark peer-focus:transparent"
        >
            Note Title
        </label>
    </div>

    <div class="relative mb-3">
        <textarea
            bind:value={updatedData.note}
            name="email"
            class="text-gray-dark border-2 peer block w-full appearance-none rounded-sm border-gray-400 px-0 py-[14px] pl-6 text-sm focus:border-gray-800 focus:outline-none focus:ring-0 h-max py-3"
            placeholder=" "
            required
        />
        <label
            for="note"
            class="absolute top-4 left-6 text-gray-middle bg-white duration-300 transform -translate-y-6 transparent peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6 peer-focus:px-[4px] peer-focus:text-gray-dark peer-focus:transparent"
        >
            Note
        </label>
        <button type="submit" class="py-3 px-6 bg-violet-400 mt-4 rounded-sm"
            >Edit</button
        >
    </div>
</form>
