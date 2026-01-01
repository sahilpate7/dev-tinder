# DevTinder Project

## Tech Stack
- React
- TypeScript
- Vite
- TailwindCSS
- React Router
- Redux Toolkit
- React Icons
- DaisyUI

## Project Setup
- Clone the repository
- Install dependencies using `npm install`
- Run the development server using `npm run dev`
- Open `http://localhost:5173` in your browser
- Setup routes in `src/App.tsx`

## Project Structure
- `src/components/` - Contains all the components
- `src/redux/` - Contains all the redux files
- `src/utils/` - Contains all the utils
- `src/assets/` - Contains all the assets
- `src/App.tsx` - Main App component
- `src/index.css` - Main CSS file
- `src/index.tsx` - Main entry point

## AWS Deployment
- Sign in to AWS Console
- Launch EC2 instance
- Configure security group
- chmod 400 <secret-key>.pem
- ssh -i <secret-key>.pem ubuntu@<public-dns-name>
- install nodejs
- Git clone the repository
- npm install
- npm run build
- sudo apt update
- sudo apt upgrade
- sudo apt install nginx
- sudo systemctl start nginx
- sudo systemctl enable nginx
- copy code from dist (build) to /var/www/html using `sudo scp dist/* /var/www/html`
- Enable port 80 in security group in AWS Console
- Go to EC2 instance and open security group and edit rules to allow port 80

## Backend Deployment
- Alow ec2 instance public IP on MongoDB server
- Update inbound rules in AWS server to allow port 7777
- Install pm2 using `npm install -g pm2`
- Run backend using `pm2 start npm -- start`
- Run pmp2 logs using `pm2 logs`
- Use pm2 flush to clear logs using `pm2 flush npm`
- Use pm2 monit to monitor server using `pm2 monit`
- Use pm2 list to list all servers using `pm2 list`
- Use pm2 stop to stop server using `pm2 stop npm`
- Use pm2 delete to delete server using `pm2 delete npm`
- Use pm2 restart to restart server using `pm2 restart npm`
- Use --name option to name server using `pm2 start npm --name "my-app" -- start`
- config nginx to proxy pass to backend
- restart nginx using `sudo systemctl restart nginx`
- check nginx status using `sudo systemctl status nginx`
- Modify constants.ts to use /api as base url

## Nginx Configuration
- sudo nano /etc/nginx/sites-available/default
- server {
    listen 80;
    server_name <public-dns-name>;
    root /var/www/html;
    index index.html;
    location /api/ {
        proxy_pass http://localhost:7777/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
