	FROM node:slim
	
	WORKDIR /usr/src/app
	 
	ENV WELCOME_MESSAGE "Ecommerce from Team 1"
	
	COPY package.json .
		
	RUN npm install
	
	COPY . .
	
	EXPOSE 4000
	
	CMD ["yarn", "start"]