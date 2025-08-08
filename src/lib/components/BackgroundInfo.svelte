<script lang="ts">
	import Card from '$lib/components/ui/card.svelte';
	import { Calendar, MapPin, Building, Award } from 'lucide-svelte';

	const experiences = [
		{
			title: 'DevOps & Backend Engineer (National Service)',
			company: 'AmaliTech',
			location: 'Takoradi, Ghana / Onsite - Kumasi Office',
			period: '2024 - Present',
			description: 'Working on automating infrastructure, streamlining CI/CD pipelines, and implementing DevSecOps practices across multiple projects.',
			achievements: [
				'Automated Terraform and CDK - based infrastructure provisioning with Jenkins',
				'Worked as a DevOps Engineer for the CRS (Car Rental System) project, managing DevOps practices and workflows for both frontend and backend teams',
				'Implemented GitHub Actions workflows for event-driven deployments',
				'Deployed Active-Passive Disaster Recovery solution using AWS Global Accelerator, EC2, ALB, S3, and Auto Scaling(Pilot-Light)',
				'Built and maintained MLOps pipelines with MLflow and Apache Airflow (Titanic ML Project)'
			]
		},
		{
			title: 'Backend Developer (Internship)',
			company: 'Dev Careers',
			location: 'Remote',
			period: '2021',
			description: 'Focused on backend API development using Node.js, Express, and MongoDB.',
			achievements: [
				'Developed REST APIs with JWT authentication and role-based access control',
				'Integrated MySQL and SQLite for database-driven projects',
				'Built admin dashboards and internal tools using Node,Express,Handlebars and Ejs'
			]
		},
		{
			title: 'Freelance Backend & Fullstack Developer',
			company: 'Self-employed',
			location: 'Kumasi, Ghana',
			period: '2019 - Present',
			description: 'Delivered production-grade applications for clients using Laravel, FastAPI, Flask, and Node.js.',
			achievements: [
				'Built Yutamart e-commerce platform (v1 & v2)',
				'Developed KsTU SRC school information system  Backend APIs and Admin Panel (Playstore & Appstore)',
				'Created a custom anime streaming platform with backend logic, UI integration, and authentication'
			]
		}
	];

	const education = [
		{
			degree: 'B.Tech in Computer Technology',
			school: 'Kumasi Technical University',
			period: '2021 - 2024',
			achievements: [
				'Capstone: Built the KsTU SRC school information system (backend APIs, authentication, and DB design) and supported mobile app integration',
			]
		},
		{
			degree: 'Diploma in Information Technology',
			school: 'Kumasi Technical University',
			period: '2019 - 2021',
			achievements: [
				'Completed practical projects in web development, scripting, and system administration',
				'Developed multiple small-scale apps (CRUD, auth) that formed the foundation for later production work',
				'Hands-on experience with Linux, Git, and relational databases'
			]
		},
		{
			degree: 'AWS Certified Solutions Architect – Associate',
			school: 'Amazon Web Services',
			period: '2025',
			achievements: [
				'Passed the Solutions Architect – Associate certification exam',
				'Designed and deployed multi-tier AWS architectures using EC2, S3, RDS, VPC and IAM',
				'Implemented Infrastructure-as-Code with Terraform and CloudFormation for repeatable deployments'
			]
		},
		{
			degree: 'AWS Certified Cloud Practitioner',
			school: 'Amazon Web Services',
			period: '2025',
			achievements: [
				'Completed Cloud Practitioner certification',
				'Hands-on labs covering core AWS services, billing, and IAM best practices',
				'Applied cloud fundamentals to cost-optimisation and basic security patterns'
			]
		},
		{
			degree: 'Kubernetes & Cloud Native Associate',
			school: 'Andela',
			period: '2025',
			achievements: [
				'Deployed and managed Kubernetes clusters in hands-on labs',
				
			]
		},
		{
			degree: 'Google Data Analytics Professional Certificate',
			school: 'Google / JA Ghana',
			period: '2023',
			achievements: [
				'Completed capstone project with end-to-end data analysis and visualization using SQL and Tableau',
				'Performed data cleaning, exploratory analysis, and produced stakeholder-facing dashboards',
				'Gained practical experience with spreadsheets, SQL queries, and basic R workflows'
			]
		}
	];
</script>


<section id="background" class="py-20 bg-muted/30 relative overflow-hidden">
	<div class="container mx-auto px-6">
		<div class="text-center mb-16 animate-fade-in">
			<h2 class="text-4xl lg:text-5xl font-bold text-foreground mb-6">
				Professional <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-glow">Background</span>
			</h2>
			<p class="text-muted-foreground text-lg max-w-2xl mx-auto">
				My journey through the tech industry, building expertise and delivering results
			</p>
		</div>

		<!-- Experience Timeline -->
		<div class="mb-16">
			<h3 class="text-2xl font-semibold text-foreground mb-8 flex items-center gap-2">
				<Building class="w-6 h-6 text-primary" />
				Professional Experience
			</h3>
			
			<div class="space-y-8">
				{#each experiences as exp, index}
					<Card class="p-6 bg-card/50 border-primary/20 backdrop-blur-sm hover:bg-card/70 transition-all duration-300 animate-fade-in" style="animation-delay: {index * 0.1}s">
						<div class="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
							<div>
								<h4 class="text-xl font-semibold text-foreground mb-1">{exp.title}</h4>
								<p class="text-primary font-medium mb-2">{exp.company}</p>
								<div class="flex items-center gap-4 text-sm text-muted-foreground mb-3">
									<span class="flex items-center gap-1">
										<MapPin class="w-4 h-4" />
										{exp.location}
									</span>
									<span class="flex items-center gap-1">
										<Calendar class="w-4 h-4" />
										{exp.period}
									</span>
								</div>
							</div>
						</div>
						
						<p class="text-muted-foreground mb-4">{exp.description}</p>
						
						<div class="space-y-2">
							<h5 class="font-medium text-foreground">Key Achievements:</h5>
							<ul class="space-y-1">
								{#each exp.achievements as achievement}
									<li class="text-sm text-muted-foreground flex items-start gap-2">
										<Award class="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
										{achievement}
									</li>
								{/each}
							</ul>
						</div>
					</Card>
				{/each}
			</div>
		</div>

		<!-- Education -->
		<div>
			<h3 class="text-2xl font-semibold text-foreground mb-8 flex items-center gap-2">
				<Award class="w-6 h-6 text-primary" />
				Education
			</h3>
			
			{#each education as edu, index}
				<Card class="p-6 bg-card/50 border-primary/20 backdrop-blur-sm hover:bg-card/70 transition-all duration-300 animate-fade-in" style="animation-delay: {index * 0.1}s">
					<h4 class="text-xl font-semibold text-foreground mb-1">{edu.degree}</h4>
					<p class="text-primary font-medium mb-2">{edu.school}</p>
					<p class="text-sm text-muted-foreground mb-3">{edu.period}</p>
					
					<div class="flex flex-wrap gap-2">
						{#each edu.achievements as achievement}
							<span class="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20">
								{achievement}
							</span>
						{/each}
					</div>
				</Card>
			{/each}
		</div>
	</div>
</section>
