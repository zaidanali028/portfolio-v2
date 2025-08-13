<script lang="ts">
	import { onMount } from 'svelte';
	import { isDarkMode } from '$lib/stores/theme';

	interface Command {
		command: string;
		output: string[];
		color?: string;
		delay?: number;
	}

	let terminalRef: HTMLDivElement;
	let inputElement: HTMLInputElement; // Reference to input
	let currentLine = '';
	let isTyping = false;
	let showCursor = true;
	let typingText = '';
	let isShowingTyping = false;
	let showBootSequence = true;
	let bootMessages: string[] = [];
	let commandHistory: Array<{
		command: string;
		output: string[];
		timestamp: string;
		isTyping?: boolean;
	}> = [];

	const username = 'ali';
	const hostname = 'portfolio';
	const currentPath = '~/portfolio';

	// Terminal commands (unchanged)
	const commands: Record<string, Command> = {
		'whoami': {
			command: 'whoami',
			output: [
				'Ali Zaidan',
				'AWS Certified Solutions Architect & DevOps Engineer',
				'Full-Stack Developer | Cloud Enthusiast | Problem Solver',
				''
			],
			color: 'text-green-400'
		},
		'ls -la ~/projects': {
			command: 'ls -la ~/projects',
			output: [
				'<span class="text-gray-400">total 42</span>',
				'<span class="text-blue-400">drwxr-xr-x</span>  8 <span class="text-yellow-400">ali</span>  <span class="text-green-400">staff</span>   256 <span class="text-gray-400">Dec  8 2024</span> <span class="text-blue-400">.</span>',
				'<span class="text-blue-400">drwxr-xr-x</span>  5 <span class="text-yellow-400">ali</span>  <span class="text-green-400">staff</span>   160 <span class="text-gray-400">Dec  8 2024</span> <span class="text-blue-400">..</span>',
				'<span class="text-white">-rw-r--r--</span>  1 <span class="text-yellow-400">ali</span>  <span class="text-green-400">staff</span>  1024 <span class="text-gray-400">Dec  8 2024</span> <span class="text-gray-300">.gitignore</span>',
				'<span class="text-blue-400">drwxr-xr-x</span>  4 <span class="text-yellow-400">ali</span>  <span class="text-green-400">staff</span>   128 <span class="text-gray-400">Dec  8 2024</span> <span class="text-cyan-400">aws-infrastructure</span>',
				'<span class="text-blue-400">drwxr-xr-x</span>  6 <span class="text-yellow-400">ali</span>  <span class="text-green-400">staff</span>   192 <span class="text-gray-400">Dec  8 2024</span> <span class="text-cyan-400">react-dashboard</span>',
				'<span class="text-blue-400">drwxr-xr-x</span>  5 <span class="text-yellow-400">ali</span>  <span class="text-green-400">staff</span>   160 <span class="text-gray-400">Dec  8 2024</span> <span class="text-cyan-400">microservices-api</span>',
				'<span class="text-blue-400">drwxr-xr-x</span>  3 <span class="text-yellow-400">ali</span>  <span class="text-green-400">staff</span>    96 <span class="text-gray-400">Dec  8 2024</span> <span class="text-cyan-400">portfolio-website</span>',
				'<span class="text-blue-400">drwxr-xr-x</span>  4 <span class="text-yellow-400">ali</span>  <span class="text-green-400">staff</span>   128 <span class="text-gray-400">Dec  8 2024</span> <span class="text-cyan-400">docker-compose-stack</span>',
				''
			],
			color: 'text-blue-400'
		},
		'cat contact.txt': {
			command: 'cat contact.txt',
			output: [
				'<span class="text-yellow-400">📧 Email:</span> <span class="text-cyan-400 underline cursor-pointer hover:text-cyan-300">ali.zaidan@example.com</span>',
				'<span class="text-blue-400">💼 LinkedIn:</span> <span class="text-cyan-400 underline cursor-pointer hover:text-cyan-300">linkedin.com/in/ali-zaidan</span>',
				'<span class="text-purple-400">🐙 GitHub:</span> <span class="text-cyan-400 underline cursor-pointer hover:text-cyan-300">github.com/ali-zaidan</span>',
				'<span class="text-green-400">🌐 Website:</span> <span class="text-cyan-400 underline cursor-pointer hover:text-cyan-300">ali-zaidan.dev</span>',
				'<span class="text-red-400">📱 Phone:</span> <span class="text-white">+1 (555) 123-4567</span>',
				'<span class="text-orange-400">📍 Location:</span> <span class="text-white">Remote / On-site</span>',
				'<span class="text-gray-400">💬 Status:</span> <span class="text-green-400">Available for opportunities</span>',
				''
			],
			color: 'text-yellow-400'
		},
		'git status': {
			command: 'git status',
			output: [
				'<span class="text-cyan-400">On branch</span> <span class="text-green-400">main</span>',
				'<span class="text-gray-400">Your branch is up to date with</span> <span class="text-yellow-400">\'origin/main\'</span><span class="text-gray-400">.</span>',
				'',
				'<span class="text-green-400">Changes to be committed:</span>',
				'  <span class="text-gray-400">(use "git reset HEAD <file>..." to unstage)</span>',
				'',
				'	<span class="text-green-400">modified:</span>   <span class="text-white">src/components/TerminalFooter.svelte</span>',
				'	<span class="text-green-400">new file:</span>   <span class="text-white">src/assets/certifications/</span>',
				'',
				'<span class="text-red-400">Changes not staged for commit:</span>',
				'  <span class="text-gray-400">(use "git add <file>..." to update what will be committed)</span>',
				'  <span class="text-gray-400">(use "git checkout -- <file>..." to discard changes in working directory)</span>',
				'',
				'	<span class="text-red-400">modified:</span>   <span class="text-white">README.md</span>',
				'	<span class="text-red-400">modified:</span>   <span class="text-white">package.json</span>',
				''
			],
			color: 'text-cyan-400'
		},
		'history | tail -5': {
			command: 'history | tail -5',
			output: [
				'  498  npm run build',
				'  499  git add .',
				'  500  git commit -m "Add terminal footer component"',
				'  501  npm run dev',
				'  502  history | tail -5',
				''
			],
			color: 'text-purple-400'
		},
		'help': {
			command: 'help',
			output: [
				'<span class="text-cyan-400">Available commands:</span>',
				'  <span class="text-green-400">whoami</span>           - Display user information',
				'  <span class="text-green-400">ls -la ~/projects</span> - List projects directory',
				'  <span class="text-green-400">cat contact.txt</span>  - Show contact information',
				'  <span class="text-green-400">git status</span>       - Show git repository status',
				'  <span class="text-green-400">history | tail -5</span> - Show recent command history',
				'  <span class="text-green-400">pwd</span>              - Show current directory',
				'  <span class="text-green-400">date</span>             - Show current date and time',
				'  <span class="text-green-400">matrix</span>           - Enter the matrix (just for fun!)',
				'  <span class="text-green-400">clear</span>            - Clear terminal screen',
				'  <span class="text-green-400">help</span>             - Show this help message',
				'',
				'<span class="text-yellow-400">Tip:</span> <span class="text-gray-400">Click on any command button below or type them manually!</span>',
				''
			],
			color: 'text-white'
		},
		'matrix': {
			command: 'matrix',
			output: [
				'<span class="text-green-400 animate-pulse">Entering the Matrix...</span>',
				'<span class="text-green-400">01001000 01100101 01101100 01101100 01101111</span>',
				'<span class="text-green-400">01010111 01101111 01110010 01101100 01100100</span>',
				'<span class="text-green-400 animate-pulse">Wake up, Neo...</span>',
				'<span class="text-red-400">Connection terminated.</span>',
				''
			],
			color: 'text-green-400',
			delay: 1200
		},
		'pwd': {
			command: 'pwd',
			output: [
				'/Users/ali/portfolio',
				''
			],
			color: 'text-blue-400'
		},
		'date': {
			command: 'date',
			output: [
				new Date().toLocaleString('en-US', {
					weekday: 'short',
					year: 'numeric',
					month: 'short',
					day: 'numeric',
					hour: '2-digit',
					minute: '2-digit',
					second: '2-digit',
					timeZoneName: 'short'
				}),
				''
			],
			color: 'text-yellow-400'
		},
		'clear': {
			command: 'clear',
			output: [],
			color: 'text-white'
		}
	};

	const demoCommands = ['whoami', 'ls -la ~/projects', 'cat contact.txt', 'git status'];
	let demoIndex = 0;
	let autoDemoInterval: ReturnType<typeof setTimeout>;

	onMount(() => {
		const cursorInterval = setInterval(() => {
			showCursor = !showCursor;
		}, 500);

		startBootSequence();

		// Focus input on mount
		setTimeout(() => {
			inputElement?.focus();
		}, 500);

		// Add click handler to terminal content to focus input
		const handleTerminalClick = () => {
			if (!isTyping) {
				inputElement?.focus();
			}
		};

		// Add click listener to terminal
		setTimeout(() => {
			if (terminalRef) {
				terminalRef.addEventListener('click', handleTerminalClick);
			}
		}, 600);

		// Fallback to hide boot
		setTimeout(() => {
			if (showBootSequence) {
				showBootSequence = false;
			}
		}, 3000);

		return () => {
			clearInterval(cursorInterval);
			clearInterval(autoDemoInterval);
			if (terminalRef) {
				terminalRef.removeEventListener('click', handleTerminalClick);
			}
		};
	});

	async function startBootSequence() {
		// Simplified boot sequence - just show ready message
		bootMessages = ['Portfolio Terminal v2.4.1 ready!'];

		// Hide boot sequence quickly
		setTimeout(() => {
			showBootSequence = false;
			startAutoDemo();
		}, 1000);
	}

	function startAutoDemo() {
		// Only run auto-demo if no user interaction has occurred
		if (demoIndex < demoCommands.length && commandHistory.length === 0 && !isTyping) {
			executeCommand(demoCommands[demoIndex], true);
			demoIndex++;

			autoDemoInterval = setTimeout(startAutoDemo, 8000);
		}
	}

	function stopAutoDemo() {
		clearTimeout(autoDemoInterval);
		demoIndex = demoCommands.length; // Prevent further auto-demo
	}

	function getCurrentTime(): string {
		return new Date().toLocaleTimeString('en-US', {
			hour12: false,
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit'
		});
	}

	async function typeCommand(cmd: string): Promise<void> {
		return new Promise((resolve) => {
			typingText = '';
			isShowingTyping = true;
			let i = 0;

			const typeInterval = setInterval(() => {
				if (i < cmd.length) {
					typingText += cmd[i];
					i++;
				} else {
					clearInterval(typeInterval);
					isShowingTyping = false;
					resolve();
				}
			}, 50 + Math.random() * 50);
		});
	}

	async function executeCommand(cmd: string, withTyping: boolean = false) {
		if (isTyping) return;

		// Stop auto-demo on user interaction (unless this IS the auto-demo)
		if (!withTyping) {
			stopAutoDemo();
		}

		// Handle clear command immediately without setting isTyping
		if (cmd === 'clear') {
			clearTerminal();
			return;
		}

		// Set typing state for other commands
		isTyping = true;

		try {

			const command = commands[cmd];
			if (!command) {
				if (withTyping) await typeCommand(cmd);
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

			// Dynamic date update
			let commandOutput = cmd === 'date'
				? [
						new Date().toLocaleString('en-US', {
							weekday: 'short',
							year: 'numeric',
							month: 'short',
							day: 'numeric',
							hour: '2-digit',
							minute: '2-digit',
							second: '2-digit',
							timeZoneName: 'short'
						}),
						''
				  ]
				: command.output;

			if (withTyping) await typeCommand(cmd);

			// Add command to history
			commandHistory = [
				...commandHistory,
				{
					command: cmd,
					output: [],
					timestamp: getCurrentTime(),
					isTyping: true
				}
			];

			// Scroll to bottom
			await new Promise(resolve => setTimeout(resolve, 100));
			terminalRef?.scrollTo(0, terminalRef.scrollHeight);

			// Simulate delay
			await new Promise(resolve => setTimeout(resolve, command.delay || 800));

			// Update output
			commandHistory = commandHistory.map((entry, index) =>
				index === commandHistory.length - 1
					? { ...entry, output: commandOutput, isTyping: false }
					: entry
			);

			// Scroll again
			terminalRef?.scrollTo(0, terminalRef.scrollHeight);
		} catch (err) {
			console.error('Command execution error:', err);
		} finally {
			isTyping = false; // Always reset
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
			stopAutoDemo();
			executeCommand(cmd);
			setTimeout(() => {
				inputElement?.focus();
			}, 100);
		}
	}
</script>

<footer class="bg-gray-900 dark:bg-gray-900 text-green-400 font-mono text-xs sm:text-sm border-t border-gray-700 dark:border-gray-700 relative overflow-hidden" class:light-terminal={!$isDarkMode}>
	<!-- Terminal Header -->
	<div class="bg-gray-800 dark:bg-gray-800 px-2 sm:px-4 py-2 flex items-center justify-between border-b border-gray-700 dark:border-gray-700">
		<div class="flex items-center gap-2">
			<div class="flex gap-1">
				<div class="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
				<div class="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
				<div class="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
			</div>
			<span class="text-gray-300 ml-2 text-xs sm:text-sm">zsh — ali@portfolio</span>
		</div>
		<div class="text-gray-400 text-xs hidden sm:block">
			Terminal v2.4.1
		</div>
	</div>

	<!-- Terminal Content -->
	<div
		bind:this={terminalRef}
		class="p-2 sm:p-4 h-64 sm:h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
		role="log"
		aria-label="Terminal output"
		aria-live="polite"
		aria-atomic="false"
	>
		<!-- Boot Sequence -->
		{#if showBootSequence}
			<div class="mb-4">
				{#each bootMessages as message, index}
					<div
						class="text-green-400 text-xs sm:text-sm font-mono animate-fade-in-up"
						style="animation-delay: {index * 100}ms;"
					>
						{message}
					</div>
				{/each}
				{#if bootMessages.length > 0}
					<div class="flex items-center mt-2">
						<div class="flex space-x-1">
							<div class="w-1 h-1 bg-green-400 rounded-full animate-bounce"></div>
							<div class="w-1 h-1 bg-green-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
							<div class="w-1 h-1 bg-green-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
						</div>
						<span class="ml-2 text-green-400 text-xs">Initializing...</span>
					</div>
				{/if}
			</div>
		{:else}
			<!-- Welcome Message -->
			<div class="mb-4 animate-fade-in-up">
				<div class="text-cyan-400 text-sm sm:text-base">Welcome to Ali's Portfolio Terminal</div>
				<div class="text-gray-400 text-xs sm:text-sm">Type 'help' for available commands or click on the suggested commands below.</div>
				<div class="text-gray-500 text-xs mt-1">Last login: {getCurrentTime()} on ttys001</div>
			</div>
		{/if}

		<!-- Typing animation display -->
		{#if isShowingTyping}
			<div class="mb-2">
				<div class="flex items-center">
					<span class="text-cyan-400">{username}@{hostname}</span>
					<span class="text-white mx-1">:</span>
					<span class="text-blue-400">{currentPath}</span>
					<span class="text-white mx-1">$</span>
					<span class="text-white">{typingText}</span>
					<span class="text-green-400 animate-pulse">▋</span>
				</div>
			</div>
		{/if}

		<!-- Command History -->
		{#each commandHistory as entry}
			<div class="mb-2">
				<!-- Command prompt and input -->
				<div class="flex items-center">
					<span class="text-cyan-400">{username}@{hostname}</span>
					<span class="text-white mx-1">:</span>
					<span class="text-blue-400">{currentPath}</span>
					<span class="text-white mx-1">$</span>
					<span class="text-white">{entry.command}</span>
					<span class="text-gray-500 ml-2 text-xs">[{entry.timestamp}]</span>
				</div>

				<!-- Command output or loading indicator -->
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
							<div class="text-gray-300 leading-relaxed">{@html line}</div>
						{/each}
					{/if}
				</div>
			</div>
		{/each}

		<!-- Current input line -->
		<div class="flex items-center flex-wrap sm:flex-nowrap">
			<div class="flex items-center text-xs sm:text-sm">
				<span class="text-cyan-400">{username}@{hostname}</span>
				<span class="text-white mx-1">:</span>
				<span class="text-blue-400">{currentPath}</span>
				<span class="text-white mx-1">$</span>
			</div>
			<input
	bind:this={inputElement}
	bind:value={currentLine}
	on:keydown={handleKeyPress}
	class="bg-transparent text-white outline-none flex-1 font-mono text-xs sm:text-sm min-w-0"
	placeholder="Type a command..."
	disabled={isTyping}
	aria-label="Terminal command input"
	autocomplete="off"
	spellcheck="false"
	tabindex="0"
/>
			{#if showCursor}
				<span class="text-green-400 animate-pulse">▋</span>
			{/if}
		</div>
	</div>

	<!-- Quick Commands -->
	<div class="bg-gray-800 dark:bg-gray-800 px-2 sm:px-4 py-3 border-t border-gray-700 dark:border-gray-700">
		<div class="text-gray-400 text-xs mb-2" id="terminal-help">Quick Commands:</div>
		<div class="flex flex-wrap gap-1 sm:gap-2">
			{#each Object.keys(commands) as cmd}
				<button
					on:click={() => handleCommandClick(cmd)}
					class="px-2 sm:px-3 py-1 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white rounded text-xs transition-colors duration-200 font-mono focus:outline-none focus:ring-2 focus:ring-cyan-400"
					disabled={isTyping}
					aria-label="Execute {cmd} command"
					tabindex="0"
				>
					{cmd}
				</button>
			{/each}
			<button
				on:click={clearTerminal}
				class="px-2 sm:px-3 py-1 bg-red-700 hover:bg-red-600 text-white rounded text-xs transition-colors duration-200 font-mono focus:outline-none focus:ring-2 focus:ring-red-400"
				aria-label="Clear terminal"
				tabindex="0"
			>
				clear
			</button>
		</div>
	</div>
</footer>

<style>
	/* Custom scrollbar for webkit browsers */
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

	/* Terminal font stack */
	footer {
		font-family: 'Fira Code', 'JetBrains Mono', 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'Consolas', monospace;
	}

	/* Light theme support */
	.light-terminal {
		background-color: #f8f9fa !important;
		color: #2d3748 !important;
		border-color: #e2e8f0 !important;
	}

	.light-terminal .bg-gray-800 {
		background-color: #e2e8f0 !important;
		border-color: #cbd5e0 !important;
	}

	.light-terminal .text-gray-300 {
		color: #4a5568 !important;
	}

	.light-terminal .text-gray-400 {
		color: #718096 !important;
	}

	.light-terminal .bg-gray-700 {
		background-color: #cbd5e0 !important;
	}

	.light-terminal .bg-gray-700:hover {
		background-color: #a0aec0 !important;
	}

	/* Responsive text sizing */
	@media (max-width: 640px) {
		footer {
			font-size: 0.75rem;
		}
	}

	/* Focus styles for accessibility */
	button:focus {
		outline: 2px solid #63b3ed;
		outline-offset: 2px;
	}

	/* Animation for loading dots */
	@keyframes bounce {
		0%, 80%, 100% {
			transform: scale(0);
		}
		40% {
			transform: scale(1);
		}
	}
</style>
