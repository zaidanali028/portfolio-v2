<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';
	import { isDarkMode } from '$lib/stores/theme';
	import { X, Minimize2, Maximize2 } from 'lucide-svelte';

	export let isOpen = false;

	const dispatch = createEventDispatcher<{
		close: void;
	}>();

	interface Command {
		command: string;
		output: string[];
		color?: string;
		delay?: number;
	}

	let terminalRef: HTMLDivElement;
	let inputElement: HTMLInputElement;
	let currentLine = '';
	let isTyping = false;
	let showCursor = true;
	let isMinimized = false;
	let commandHistory: Array<{
		command: string;
		output: string[];
		timestamp: string;
		isTyping?: boolean;
	}> = [];

	const username = 'ali';
	const hostname = 'portfolio';
	const currentPath = '~/portfolio';

	// Terminal commands (same as before but condensed for space)
	const commands: Record<string, Command> = {
		'whoami': {
			command: 'whoami',
			output: [
				'Ali Usman Zaidan',
				'AWS Certified Solutions Architect & DevOps Engineer',
				'Full-Stack Developer | Cloud Enthusiast | Problem Solver',
				''
			],
			color: 'text-green-400'
		},
		'cat contact.txt': {
			command: 'cat contact.txt',
			output: [
				'<span class="text-yellow-400">📧 Email:</span> <span class="text-cyan-400 underline cursor-pointer hover:text-cyan-300 transition-colors duration-200" title="Click to send email">zaidanali028@gmail.com</span>',
				'<span class="text-blue-400">💼 LinkedIn:</span> <span class="text-cyan-400 underline cursor-pointer hover:text-cyan-300 transition-colors duration-200" title="Click to open LinkedIn profile">https://www.linkedin.com/in/ali-usman-zaidan-630028200/</span>',
				'<span class="text-purple-400">🐙 GitHub:</span> <span class="text-cyan-400 underline cursor-pointer hover:text-cyan-300 transition-colors duration-200" title="Click to open GitHub profile">github.com/zaidanali028</span>',
				'<span class="text-green-400">🌐 Website:</span> <span class="text-cyan-400 underline cursor-pointer hover:text-cyan-300 transition-colors duration-200" title="Click to open website">https://zaidanali028.github.io/portfolio-v2/</span>',
				'<span class="text-red-400">📱 Phone:</span> <span class="text-gray-300">+233240040834</span>',
				'<span class="text-orange-400">📍 Location:</span> <span class="text-gray-300">Remote / On-site</span>',
				'<span class="text-gray-400">💬 Status:</span> <span class="text-green-400">Available for opportunities</span>',
				''
			],
			color: 'text-yellow-400'
		},
		'help': {
			command: 'help',
			output: [
				'<span class="text-cyan-400">Available commands:</span>',
				'  <span class="text-green-400">whoami</span>           - Display user information',
				'  <span class="text-green-400">cat contact.txt</span>  - Show contact information',
				'  <span class="text-green-400">clear</span>            - Clear terminal screen',
				'  <span class="text-green-400">help</span>             - Show this help message',
				'',
				'<span class="text-yellow-400">Tip:</span> <span class="text-gray-400">Click on any command button below or type them manually!</span>',
				''
			],
			color: 'text-white'
		},
		'clear': {
			command: 'clear',
			output: [],
			color: 'text-white'
		}
	};

	onMount(() => {
		const cursorInterval = setInterval(() => {
			showCursor = !showCursor;
		}, 500);

		return () => {
			clearInterval(cursorInterval);
		};
	});

	function getCurrentTime(): string {
		return new Date().toLocaleTimeString('en-US', {
			hour12: false,
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit'
		});
	}

	async function executeCommand(cmd: string) {
		if (isTyping) return;

		if (cmd === 'clear') {
			clearTerminal();
			return;
		}

		isTyping = true;

		try {
			const command = commands[cmd];
			if (!command) {
				commandHistory = [
					...commandHistory,
					{
						command: cmd,
						output: [`<span class="text-red-400">zsh: command not found: ${cmd}</span>`, ''],
						timestamp: getCurrentTime()
					}
				];
				return;
			}

			commandHistory = [
				...commandHistory,
				{
					command: cmd,
					output: [],
					timestamp: getCurrentTime(),
					isTyping: true
				}
			];

			await new Promise(resolve => setTimeout(resolve, 100));
			terminalRef?.scrollTo(0, terminalRef.scrollHeight);

			await new Promise(resolve => setTimeout(resolve, command.delay || 800));

			commandHistory = commandHistory.map((entry, index) =>
				index === commandHistory.length - 1
					? { ...entry, output: command.output, isTyping: false }
					: entry
			);

			terminalRef?.scrollTo(0, terminalRef.scrollHeight);
		} catch (err) {
			console.error('Command execution error:', err);
		} finally {
			isTyping = false;
		}
	}

	function handleKeyPress(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			event.preventDefault();
			if (currentLine.trim() && !isTyping) {
				executeCommand(currentLine.trim());
				currentLine = '';
			}
		}
	}

	function clearTerminal() {
		commandHistory = [];
	}

	function handleCommandClick(cmd: string) {
		if (!isTyping && cmd) {
			executeCommand(cmd);
			setTimeout(() => {
				inputElement?.focus();
			}, 100);
		}
	}

	function handleLinkClick(event: Event) {
		const target = event.target as HTMLElement;
		if (target && target.classList.contains('cursor-pointer')) {
			const text = target.textContent || '';
			
			event.preventDefault();
			event.stopPropagation();
			
			if (text.includes('@') && text.includes('.')) {
				window.open(`mailto:${text}`, '_blank');
			} else if (text.includes('linkedin.com')) {
				const url = text.startsWith('http') ? text : `https://${text}`;
				window.open(url, '_blank');
			} else if (text.includes('github.com')) {
				const url = text.startsWith('http') ? text : `https://${text}`;
				window.open(url, '_blank');
			} else if (text.includes('zaidanali028.github.io') || text.includes('portfolio')) {
				const url = text.startsWith('http') ? text : `https://${text}`;
				window.open(url, '_blank');
			}
		}
	}

	function handleClose() {
		dispatch('close');
	}

	function toggleMinimize() {
		isMinimized = !isMinimized;
	}

	// Focus input when modal opens
	$: if (isOpen && inputElement) {
		setTimeout(() => {
			inputElement?.focus();
		}, 100);
	}
</script>

{#if isOpen}
	<!-- Modal Backdrop -->
	<div 
		class="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
		on:click={handleClose}
		role="button"
		tabindex="0"
		on:keydown={(e) => e.key === 'Escape' && handleClose()}
	></div>

	<!-- Terminal Modal -->
	<div 
		class="fixed inset-4 md:inset-8 lg:inset-16 bg-gray-900 rounded-lg shadow-2xl z-50 flex flex-col transition-all duration-300"
		class:h-12={isMinimized}
		class:overflow-hidden={isMinimized}
	>
		<!-- Terminal Header -->
		<div class="bg-gray-800 px-4 py-3 flex items-center justify-between border-b border-gray-700 rounded-t-lg">
			<div class="flex items-center gap-3">
				<div class="flex gap-2">
					<div class="w-3 h-3 bg-red-500 rounded-full"></div>
					<div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
					<div class="w-3 h-3 bg-green-500 rounded-full"></div>
				</div>
				<span class="text-gray-300 text-sm font-mono">zsh — ali@portfolio</span>
			</div>
			<div class="flex items-center gap-2">
				<button
					on:click={toggleMinimize}
					class="p-1 hover:bg-gray-700 rounded transition-colors"
					aria-label={isMinimized ? 'Maximize' : 'Minimize'}
				>
					{#if isMinimized}
						<Maximize2 class="w-4 h-4 text-gray-400" />
					{:else}
						<Minimize2 class="w-4 h-4 text-gray-400" />
					{/if}
				</button>
				<button
					on:click={handleClose}
					class="p-1 hover:bg-gray-700 rounded transition-colors"
					aria-label="Close Terminal"
				>
					<X class="w-4 h-4 text-gray-400" />
				</button>
			</div>
		</div>

		{#if !isMinimized}
			<!-- Terminal Content -->
			<div
				bind:this={terminalRef}
				class="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 font-mono text-sm"
			>
				<!-- Welcome Message -->
				<div class="mb-4">
					<div class="text-cyan-400 text-base">Welcome to Ali's Portfolio Terminal</div>
					<div class="text-gray-400 text-sm">Type 'help' for available commands or click on the suggested commands below.</div>
				</div>

				<!-- Command History -->
				{#each commandHistory as entry}
					<div class="mb-2">
						<div class="flex items-center">
							<span class="text-cyan-400">{username}@{hostname}</span>
							<span class="text-white mx-1">:</span>
							<span class="text-blue-400">{currentPath}</span>
							<span class="text-white mx-1">$</span>
							<span class="text-white">{entry.command}</span>
							<span class="text-gray-500 ml-2 text-xs">[{entry.timestamp}]</span>
						</div>

						<div class="mt-1 ml-4">
							{#if entry.isTyping}
								<div class="flex items-center text-yellow-400">
									<div class="flex space-x-1">
										<div class="w-1 h-1 bg-yellow-400 rounded-full animate-bounce"></div>
										<div class="w-1 h-1 bg-yellow-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
										<div class="w-1 h-1 bg-yellow-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
									</div>
									<span class="ml-2 text-sm">Executing command...</span>
								</div>
							{:else}
								{#each entry.output as line}
									<div 
										class="text-gray-300 leading-relaxed" 
										on:click={handleLinkClick}
										on:keydown={(e) => e.key === 'Enter' && handleLinkClick(e)}
										role="button"
										tabindex="0"
									>{@html line}</div>
								{/each}
							{/if}
						</div>
					</div>
				{/each}

				<!-- Current input line -->
				<div class="flex items-center">
					<div class="flex items-center text-sm">
						<span class="text-cyan-400">{username}@{hostname}</span>
						<span class="text-white mx-1">:</span>
						<span class="text-blue-400">{currentPath}</span>
						<span class="text-white mx-1">$</span>
					</div>
					<input
						bind:this={inputElement}
						bind:value={currentLine}
						on:keydown={handleKeyPress}
						class="bg-transparent text-white outline-none flex-1 font-mono text-sm min-w-0 ml-1"
						placeholder="Type a command..."
						disabled={isTyping}
						aria-label="Terminal command input"
						autocomplete="off"
						spellcheck="false"
					/>
					{#if showCursor}
						<span class="text-green-400 animate-pulse">▋</span>
					{/if}
				</div>
			</div>

			<!-- Quick Commands -->
			<div class="bg-gray-800 px-4 py-3 border-t border-gray-700 rounded-b-lg">
				<div class="text-gray-400 text-xs mb-2">Quick Commands:</div>
				<div class="flex flex-wrap gap-2">
					{#each Object.keys(commands) as cmd}
						<button
							on:click={() => handleCommandClick(cmd)}
							class="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white rounded text-xs transition-colors duration-200 font-mono"
							disabled={isTyping}
							aria-label="Execute {cmd} command"
						>
							{cmd}
						</button>
					{/each}
				</div>
			</div>
		{/if}
	</div>
{/if}

<style>
	.scrollbar-thin::-webkit-scrollbar {
		width: 6px;
	}

	.scrollbar-thumb-gray-600::-webkit-scrollbar-thumb {
		background-color: #4b5563;
		border-radius: 3px;
	}

	.scrollbar-track-gray-800::-webkit-scrollbar-track {
		background-color: #1f2937;
	}

	:global(.cursor-pointer) {
		transition: all 0.2s ease;
	}

	:global(.cursor-pointer:hover) {
		text-shadow: 0 0 8px currentColor;
		transform: scale(1.02);
	}
</style>
