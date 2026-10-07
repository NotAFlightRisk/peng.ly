import 'unplugin-icons/types/svelte';
import type { Component } from 'svelte';

declare global {
	namespace App {
		interface PageData {
			title?: string;
			description?: string;
			meta?: string;
			image?: { src: string; alt: string; width?: string; height?: string };
			footer?: Component;
		}
	}
}

export {};
