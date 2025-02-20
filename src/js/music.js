// -- M U S I C -- //

var currentAudioIndex = 0;
var durationBarInterval;
var audios = [
	{
		"title" : "AWOL",
		"artist" : "Papa Khan",
		"url" : "src/audio/Papa Khan - AWOL.mp3",
		"src" : "src/images/Papa Khan - AWOL.jpg"
	},
	{
		"title" : "The Search",
		"artist" : "NF",
		"url" : "src/audio/NF - The Search.mp3",
		"src" : "src/images/NF - The Search.jpg"
	},
	{
		"title" : "Rain",
		"artist" : "Papa Khan",
		"url" : "src/audio/Papa Khan - Rain.mp3",
		"src" : "src/images/Papa Khan - Rain.jpg"
	},
	{
		"title" : "Let You Down",
		"artist" : "NF",
		"url" : "src/audio/NF - Let You Down.mp3",
		"src" : "src/images/NF - Let You Down.webp"
	},
]

for (var i = 0; i < audios.length; i++) {
	audios[i].id = i;
}

var audio = new Audio(audios[currentAudioIndex].url);

const reloadPlayer = () => {
	audio.src = audios[currentAudioIndex].url;
	audio.addEventListener("canplay", e => {
		audio.play();
	});
	player_title.innerHTML = audios[currentAudioIndex].title;
	document.querySelectorAll(".music-bottom-side-player-title").forEach(item => {
		item.innerHTML = audios[currentAudioIndex].title;

	});
	plyer_artist.innerHTML = audios[currentAudioIndex].artist;
	document.querySelectorAll(".music-bottom-side-player-artist").forEach(item => {
		item.innerHTML = audios[currentAudioIndex].artist;
	});
	player_icon_img.src = audios[currentAudioIndex].src;
	document.querySelectorAll(".music-bottom-side-icon").forEach(item => {
		item.src = audios[currentAudioIndex].src;
	});
	duration_bar.style.width = `0%`;
	player_pause.innerHTML = '<path d="M10 24h-3c 0 0-3 0-3-3v-18c0 0 0-3 3-3c0 0 3 0 3 3v18c 0 0 0 3-3 3zm10 0h-3c0 0-3 0-3-3v-18c0 0 0-3 3-3c0 0 3 0 3 3v18 c 0 0 0 3-3 3z"></path>';
	document.querySelectorAll(".music-bottom-side-pause").forEach(item => {
		item.innerHTML = '<path d="M10 24h-3c 0 0-3 0-3-3v-18c0 0 0-3 3-3c0 0 3 0 3 3v18c 0 0 0 3-3 3zm10 0h-3c0 0-3 0-3-3v-18c0 0 0-3 3-3c0 0 3 0 3 3v18 c 0 0 0 3-3 3z"></path>';
	});

	document.querySelectorAll(".music-right-side").forEach(item => {
		item.querySelectorAll(".music-right-side-music-list-line").forEach(line => {
			if (line.item_id == currentAudioIndex) {
				line.style.backgroundColor = "var(--light-bg)";
			}
			else {
				line.style.backgroundColor = null;
			}
		});
	});

	audio.addEventListener("play", e => {
		playAudio();
	});

	audio.addEventListener("pause", e => {
		pauseAudio();
	});
}

const nextTrack = () => {
	currentAudioIndex += parseInt((currentAudioIndex >= audios.length-1) && `${-1*audios.length+1}` || "1");
	reloadPlayer();
}

const previousTrack = () => {
	currentAudioIndex -= parseInt((currentAudioIndex <= 0) && `${-1*audios.length+1}` || "1");
	reloadPlayer();
}

const playAudio = () => {
	durationBarInterval = setInterval(() => {
		duration_bar.style.width = `${(audio.currentTime/audio.duration)*100}%`;
		document.querySelectorAll(".music-bottom-side-duration-bar").forEach(item => {
			item.style.width = `${(audio.currentTime/audio.duration)*100}%`;
		});
	}, 500);
}

const pauseAudio = () => {
	clearInterval(durationBarInterval);
	if (audio.currentTime == audio.duration) {
		nextTrack();
	}
}

const changeCurrentAudioTime = (e) => {
	audio.currentTime = (e.offsetX/e.currentTarget.offsetWidth)*audio.duration;
	duration_bar.style.width = `${(audio.currentTime/audio.duration)*100}%`;
	document.querySelectorAll(".music-bottom-side-duration-bar").forEach(item => {
		item.style.width = `${(audio.currentTime/audio.duration)*100}%`;
	});
}

const playPauseAudio = () => {
	if (audio.paused) {
		audio.play();
		player_pause.innerHTML = '<path d="M10 24h-3c 0 0-3 0-3-3v-18c0 0 0-3 3-3c0 0 3 0 3 3v18c 0 0 0 3-3 3zm10 0h-3c0 0-3 0-3-3v-18c0 0 0-3 3-3c0 0 3 0 3 3v18 c 0 0 0 3-3 3z"></path>';
		document.querySelectorAll(".music-bottom-side-pause").forEach(item => {
			item.innerHTML = '<path d="M10 24h-3c 0 0-3 0-3-3v-18c0 0 0-3 3-3c0 0 3 0 3 3v18c 0 0 0 3-3 3zm10 0h-3c0 0-3 0-3-3v-18c0 0 0-3 3-3c0 0 3 0 3 3v18 c 0 0 0 3-3 3z"></path>';
		});
	}
	else {
		audio.pause();
		player_pause.innerHTML = '<path d="M3 22v-17c0 0-0.5-4 3-3l15 8.5c0 0 1.5 1.5 0 3l-15 8.5c 0 0-4 1-3-3z"></path>';
		document.querySelectorAll(".music-bottom-side-pause").forEach(item => {
			item.innerHTML = '<path d="M3 22v-17c0 0-0.5-4 3-3l15 8.5c0 0 1.5 1.5 0 3l-15 8.5c 0 0-4 1-3-3z"></path>';
		});
	}
}

var music_content = document.createElement("div");
music_content.classList.add("music-content");

var music_left_side = document.createElement("div");
music_left_side.classList.add("music-left-side");

var music_left_side_items = document.createElement("div");
music_left_side_items.classList.add("music-left-side-items");

var music_left_side_sections = document.createElement("div");
music_left_side_sections.classList.add("music-left-side-section");

music_left_side_sections_items = [
	{
		"src" : "home",
		"label" : "Home"
	},
	{
		"src" : "home",
		"label" : "Search"
	},
	{
		"src" : "home",
		"label" : "Your Library"
	},
]

music_left_side_sections_items.forEach(item => {
	var music_left_side_sections_item = document.createElement("div");
	music_left_side_sections_item.classList.add("music-left-side-sections-item");

	var music_left_side_sections_item_icon_holder = document.createElement("div");
	music_left_side_sections_item_icon_holder.classList.add("music-left-side-sections-item-icon-holder");
	if (item.src == "home") { // if colored folder needed
		var music_left_side_sections_item_icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		music_left_side_sections_item_icon.setAttributeNS(null, "viewBox", "0 0 196 196");
		music_left_side_sections_item_icon.classList.add("music-left-side-sections-item-icon");
		music_left_side_sections_item_icon.innerHTML = '<path d="m 54.253,194.747 c 7.35695,0 16.747,-3.95785 16.747,-10.878 v -44.783 c 0,0 -0.83176,-8.1372 10.416,-8.54422 11.247769,-0.40702 33.168,0 33.168,0 0,0 10.416,-1.1125 10.416,8.54422 v 44.46 c 0,8.40413 9.35218,11.201 16.747,11.201 H 178 c 0,0 16.74701,1.33209 16.747,-11.201 0,0 -5e-5,-76.24649 -5e-5,-95.816 C 194.74695,73.126372 183.2,65.088 183.2,65.088 L 116.78272,8.0140635 c 0,0 -15.55026,-15.2658229 -34.213176,0 L 12.795,65.088 c 0,0 -11.533,7.268738 -11.533,22.642 0,8.58803 0,96.48922 0,96.48922 0,0 -0.058669,10.54188 13.102057,10.52778 h 16.219975 z"></path>';
	}
	else {
		var music_left_side_sections_item_icon = document.createElement("img");
		music_left_side_sections_item_icon.classList.add("music-left-side-sections-item-icon");
		music_left_side_sections_item_icon.src = item.src;
	}

	var music_left_side_sections_item_label = document.createElement("div");
	music_left_side_sections_item_label.classList.add("music-left-side-sections-item-label");
	music_left_side_sections_item_label.innerHTML = item.label;

	music_left_side_sections_item_icon_holder.appendChild(music_left_side_sections_item_icon);

	music_left_side_sections_item.appendChild(music_left_side_sections_item_icon_holder);
	music_left_side_sections_item.appendChild(music_left_side_sections_item_label);

	music_left_side_sections.appendChild(music_left_side_sections_item);
});

var music_left_side_playlists = document.createElement("div");
music_left_side_playlists.classList.add("music-left-side-playlists");

var music_left_side_main_playlists_items = [
	{
		"src" : "src/images/home.svg",
		"label" : "Create Playlist"
	},
	{
		"src" : "src/images/home.svg",
		"label" : "Liked Songs"
	},
]

var music_left_side_personal_playlists_items = [
	{
		"label" : "Guest's best"
	},
]

var music_left_side_main_playlists = document.createElement("div");
music_left_side_main_playlists.classList.add("music-left-side-main-playlists");

music_left_side_main_playlists_items.forEach(item => {
	var music_left_side_main_playlist = document.createElement("div");
	music_left_side_main_playlist.classList.add("music-left-side-main-playlist");

	var music_left_side_main_playlist_icon_holder = document.createElement("div");
	music_left_side_main_playlist_icon_holder.classList.add("music-left-side-main-playlist-icon-holder");

	var music_left_side_main_playlist_icon = document.createElement("img");
	music_left_side_main_playlist_icon.classList.add("music-left-side-main-playlist-icon");
	music_left_side_main_playlist_icon.src = item.src;

	var music_left_side_main_playlist_label = document.createElement("div");
	music_left_side_main_playlist_label.classList.add("music-left-side-main-playlist-label");
	music_left_side_main_playlist_label.innerHTML = item.label;

	music_left_side_main_playlist_icon_holder.appendChild(music_left_side_main_playlist_icon);

	music_left_side_main_playlist.appendChild(music_left_side_main_playlist_icon_holder);
	music_left_side_main_playlist.appendChild(music_left_side_main_playlist_label);

	music_left_side_main_playlists.appendChild(music_left_side_main_playlist);
});

var music_left_side_personal_playlists = document.createElement("div");
music_left_side_personal_playlists.classList.add("music-left-side-personal-playlists");

music_left_side_personal_playlists_items.forEach(item => {
	var music_left_side_personal_playlist = document.createElement("div");
	music_left_side_personal_playlist.classList.add("music-left-side-personal-playlist");

	var music_left_side_personal_playlist_label = document.createElement("div");
	music_left_side_personal_playlist_label.classList.add("music-left-side-personal-playlist-label");
	music_left_side_personal_playlist_label.innerHTML = item.label;

	music_left_side_personal_playlist.appendChild(music_left_side_personal_playlist_label);

	music_left_side_personal_playlists.appendChild(music_left_side_personal_playlist);
});

music_left_side_playlists.appendChild(music_left_side_main_playlists);
music_left_side_playlists.appendChild(document.createElement("hr"));
music_left_side_playlists.appendChild(music_left_side_personal_playlists);

music_left_side_items.appendChild(music_left_side_sections);

music_left_side.appendChild(music_left_side_sections);
music_left_side.appendChild(music_left_side_playlists);

var music_right_side = document.createElement("div");
music_right_side.classList.add("music-right-side");

var music_bottom_side = document.createElement("div");
music_bottom_side.classList.add("music-bottom-side");

var music_main = document.createElement("div");
music_main.classList.add("music-main");

music_main.appendChild(music_left_side);
music_main.appendChild(music_right_side);

music_content.appendChild(music_main);
music_content.appendChild(music_bottom_side);

const musicListeners = content => {
	var music_list_holder = content.querySelector(".music-right-side");

	var music_list = document.createElement("div");
	music_list.classList.add("music-right-side-music-list");

	var music_list_header = document.createElement("div");
	music_list_header.classList.add("music-right-side-music-list-header");
	
	var music_list_header_ids = document.createElement("div");
	music_list_header_ids.style.textAlign = "center";
	music_list_header_ids.innerHTML = "#";

	var music_list_header_titles = document.createElement("div");
	music_list_header_titles.innerHTML = "TITLE";

	var music_list_header_durations = document.createElement("div");
	music_list_header_durations.style.textAlign = "center";
	music_list_header_durations.innerHTML = "DURATION";

	var music_list_split = document.createElement("hr");

	music_list_header.appendChild(music_list_header_ids);
	music_list_header.appendChild(music_list_header_titles);
	music_list_header.appendChild(music_list_header_durations);

	music_list.appendChild(music_list_header);
	music_list.appendChild(music_list_split);

	const addDuration = (i) => {
		var item = music_list_holder.querySelectorAll(".music-right-side-music-list-line")[i];
		var duration = item.querySelector(".music-right-side-music-list-line-duration");
		duration.innerHTML = `${(item.tmp_audio.duration - item.tmp_audio.duration%60)/60}:${(parseInt(item.tmp_audio.duration%60) < 10) && '0'+parseInt(item.tmp_audio.duration%60) || parseInt(item.tmp_audio.duration%60)}`;
		item.tmp_audio = null;
	}

	var i = 0;
	while (i < audios.length) {
		var music_list_line = document.createElement("div");
		music_list_line.classList.add("music-right-side-music-list-line");
		music_list_line.item_id = audios[i].id;
		music_list_line.style.backgroundColor = (i == currentAudioIndex) && "var(--light-bg)";
		music_list_line.addEventListener("click", e => {
			if (currentAudioIndex != e.currentTarget.item_id || audio.paused) {
				currentAudioIndex = e.currentTarget.item_id;
				reloadPlayer();
			}
		});

		var music_list_line_id = document.createElement("div");
		music_list_line_id.classList.add("music-right-side-music-list-line-id");
		music_list_line_id.innerHTML = audios[i].id + 1;

		var music_list_line_title = document.createElement("div");
		music_list_line_title.classList.add("music-right-side-music-list-line-title");
		music_list_line_title.innerHTML = audios[i].title;

		var music_list_line_duration = document.createElement("div");
		music_list_line_duration.classList.add("music-right-side-music-list-line-duration");

		music_list_line.tmp_audio = new Audio(audios[i].url);
		music_list_line.tmp_audio.item_id = audios[i].id;
		music_list_line.tmp_audio.addEventListener("loadedmetadata", e => {
			addDuration(e.currentTarget.item_id);
		});

		music_list_line.appendChild(music_list_line_id);
		music_list_line.appendChild(music_list_line_title);
		music_list_line.appendChild(music_list_line_duration);

		music_list.appendChild(music_list_line);
		i += 1;
	}

	music_list_holder.appendChild(music_list);

	var bottom_bar = content.querySelector(".music-bottom-side");
	
	var left_bottom = document.createElement("div");
	left_bottom.classList.add("music-bottom-left-side");

	var icon_holder = document.createElement("div");
	icon_holder.classList.add("music-bottom-side-icon-holder");

	var icon = document.createElement("img");
	icon.classList.add("music-bottom-side-icon");
	icon.src = audios[currentAudioIndex].src;

	var info = document.createElement("div");
	info.classList.add("music-bottom-side-player-info");
	
	var title = document.createElement("div"); 
	title.classList.add("music-bottom-side-player-title");
	title.innerHTML = audios[currentAudioIndex].title;

	var artist = document.createElement("div"); 
	artist.classList.add("music-bottom-side-player-artist");
	artist.innerHTML = audios[currentAudioIndex].artist;

	info.appendChild(title);
	info.appendChild(artist);

	icon_holder.appendChild(icon);
	
	left_bottom.appendChild(icon_holder);
	left_bottom.appendChild(info);

	bottom_bar.appendChild(left_bottom);

	var player = document.createElement("div");
	player.classList.add("music-bottom-side-player");

	var player_control = document.createElement("div");
	player_control.classList.add("music-bottom-side-player-control");

	var player_prev = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	player_prev.classList.add("music-bottom-side-prev");
	player_prev.setAttributeNS(null, "viewBox", "0 0 24 24");
	player_prev.innerHTML = '<path d="M0 21v-15c 0 0-0.5-4 3-3l12 7.5c0 0 1.5 1.5 0 3l-12 7.5c0 0-4 1-3-3zm12-16c 0 0-2 0-1 2.268l5.888 3.732c0 0 1 1 0 2l-3.888 2.732c0 0-4.5 2.5-1 3.268l11-6c0 0 1-1 0-2 l-11-6z"></path>';
	player_prev.style.transform = "rotate(180deg)";
	player_prev.style.fill = "#ffffff";
	player_prev.addEventListener("click", e => {
		previousTrack();
	});

	var player_pause = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	player_pause.classList.add("music-bottom-side-pause");
	player_pause.setAttributeNS(null, "viewBox", "0 0 24 24");
	if (audio.paused) {
		player_pause.innerHTML = '<path d="M3 22v-17c0 0-0.5-4 3-3l15 8.5c0 0 1.5 1.5 0 3l-15 8.5c 0 0-4 1-3-3z"></path>';
	}
	else {
		player_pause.innerHTML = '<path d="M10 24h-3c 0 0-3 0-3-3v-18c0 0 0-3 3-3c0 0 3 0 3 3v18c 0 0 0 3-3 3zm10 0h-3c0 0-3 0-3-3v-18c0 0 0-3 3-3c0 0 3 0 3 3v18 c 0 0 0 3-3 3z"></path>';
	}
	player_pause.style.fill = "#ffffff";
	player_pause.addEventListener("click", e => {
		playPauseAudio();
	});

	var player_next = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	player_next.classList.add("music-bottom-side-next");
	player_next.setAttributeNS(null, "viewBox", "0 0 24 24");
	player_next.innerHTML = '<path d="M0 21v-15c 0 0-0.5-4 3-3l12 7.5c0 0 1.5 1.5 0 3l-12 7.5c0 0-4 1-3-3zm12-16c 0 0-2 0-1 2.268l5.888 3.732c0 0 1 1 0 2l-3.888 2.732c0 0-4.5 2.5-1 3.268l11-6c0 0 1-1 0-2 l-11-6z"></path>';
	player_next.style.fill = "#ffffff";
	player_next.addEventListener("click", e => {
		nextTrack();
	});

	var duration_bar_holder = document.createElement("div");
	duration_bar_holder.classList.add("music-bottom-side-duration-bar-holder");
	duration_bar_holder.addEventListener("click", e => {
		changeCurrentAudioTime(e);
	});

	var duration_bar = document.createElement("div");
	duration_bar.classList.add("music-bottom-side-duration-bar");

	player_control.appendChild(player_prev);
	player_control.appendChild(player_pause);
	player_control.appendChild(player_next);

	duration_bar_holder.appendChild(duration_bar);

	player.appendChild(player_control);
	player.appendChild(duration_bar_holder);

	bottom_bar.appendChild(player);

	var right_bottom = document.createElement("div");
	right_bottom.classList.add("music-bottom-right-side");

	var volume_bar_holder = document.createElement("div");
	volume_bar_holder.classList.add("music-bottom-side-volume-bar-holder");

	var volume_bar = document.createElement("div");
	volume_bar.classList.add("music-bottom-side-volume-bar");

	volume_bar_holder.addEventListener("click", e => {
		audio.volume = (e.currentTarget.offsetHeight-e.offsetY)/e.currentTarget.offsetHeight;
		e.currentTarget.querySelector(".music-bottom-side-volume-bar").style.height = `${audio.volume*100}%`;
	});

	volume_bar_holder.appendChild(volume_bar);

	right_bottom.appendChild(volume_bar_holder);

	bottom_bar.appendChild(right_bottom);
}

// -- //

music_content.classList.add("noselect");
