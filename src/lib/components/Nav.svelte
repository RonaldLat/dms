<script>
    import { goto } from "$app/navigation";
    import {
        Button,
        Dropdown,
        DropdownItem,
        Avatar,
    } from "flowbite-svelte";
	import { supabase } from '$lib/supabaseClient.js';
	import { currentUser } from '$lib/store/authState.js';



    let avatarUrl = "";
    const getImg = async () => {
        const { data } = supabase.storage
            .from("dms_users")
            .getPublicUrl($currentUser.id + ".png");
        avatarUrl = data.publicUrl;
    };
	const logOut = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			//console.log('sign out error: ', error);
		}
	};
	const navigateTo = () => {
		goto('/signup');
	};
	supabase.auth.onAuthStateChange((event, session) => {
		console.log('event: ', event, 'session: ', session);
		try {
			$currentUser = session.user
		} catch {
			console.log('No session available');
			$currentUser = '';
		}
		///getCurrentUser();
	});
	const getCurrentUser = async () => {
		const {
			data: { user }
		} = await supabase.auth.getUser();
		if (user) {
			$currentUser = user;
		}
	};

	console.log('store value user:', $currentUser);
    getImg();
</script>

<nav class=" p-4 flex justify-between z-50">
    <ul class="flex flex-col space-x-4" />
    {#if !$currentUser}
        <button
            on:click={() => goto("/register")}
            type="button"
            class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >Register</button
        >
    {/if}
    {#if $currentUser}
        <Button pill color="light" id="avatar_with_name" class="py-2  bg-violet-500 text-gray-100 hover:bg-violet-600 ease-in-out duration-150" >
            <Avatar
                src="https://w7.pngwing.com/pngs/78/788/png-transparent-computer-icons-avatar-business-computer-software-user-avatar-child-face-hand-thumbnail.png"
                class="mr-2"
            />
            {$currentUser.user_metadata.username}
        </Button>
        <Dropdown inline triggeredBy="#avatar_with_name" class='z-20'>
            <div slot="header" class="px-4 py-2">{$currentUser.email}</div>
            <DropdownItem href='/notes'>Notes</DropdownItem>
            <DropdownItem class="z-50" href='settings'>Settings</DropdownItem>
            <DropdownItem slot="footer" on:click={logOut}>Sign out</DropdownItem>
        </Dropdown>
    {/if}
</nav>
