const ProjectMember = require('../model/project-member.model');
const User = require('../model/user.model');
const sendMail = require('../helpers/send-mail.helper');

class ProjectMemberController {
    static sendMail(req, res) {
        console.log('ini member', req.params.member);
        User.findOne({ _id: req.params.member })
            .then(data => {
                console.log(data)
                let html = `<html>
        <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
        .card {
          box-shadow: 0 4px 8px 0 rgba(0,0,0,3);
          transition: 0.3s;
          width: 800px;
          border-radius: 5px;
        }
        
        .card:hover {
          box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
        }
        h1{
          padding-top: 20px;
          color: rgb(229, 153, 153);
        }
        
        h4{
          color: teal;
          margin: 0;
          padding: 0;
        }
        
        img{
          margin: 0;
          padding: 0;
          width: 300px;
          height: 400px;
        }
        
        p{
          font-size:  14px;
          color: black;
          font-family: 'Dosis', sans-serif;
        }
        .container {
          padding: 20px;
        }
        
        .btn-join{
          background-color: teal;
          border-radius: 4px;
          text-align: center;
          color: white;
          text-decoration: none;
          border: none;
          padding: 10px;
          font-size: 25px;
          font-family: 'Indie Flower', cursive;
        }

        a{
            color: white;
            text-decoration: none;
        }
        
        .btn-join:hover {
            box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0,      0, 0.19);
            outline: none;
            border: 2px solid teal;
            color: gray;
            background-color: white;
        }
        
        .footer{
          padding-bottom: 20px;
        }
        </style>
        </head>
        <body>
        
        <center>
        
        <div class="card">
          <h1>TO DO APPS<h1>
          <img src="https://i.pinimg.com/736x/22/9c/e5/229ce55dcfaec638721108563ed44306.jpg" alt="" >
          <div class="container">
          
            <h4><b>Verification to join project</b></h4> 
            <p>Hai ${data.name}, do you want to join this project ^_^. I need many many your help, I'm happy one team with you. If you want to join click button join on bellow, thank you </p> 
          </div>
          <div class="footer">
          <a href="http://localhost:3000/pm/${req.params.projectId}/${req.params.member}" class="btn-join text-white">JOIN</a>
          </div>
        </div>
        <center>
        </body>
        </html> `;
                sendMail(data.email, "INVITATION TO JOIN MEMBER", html);
            })
    }
    static addMember(req, res) {
        ProjectMember.create({
            project: req.params.projectId,
            member: req.params.member
        })
            .then(data => {
                res.writeHead(301,
                    {Location: 'http://localhost:1234'}
                  );
                  res.end();
            })
            .catch(err => {
                res.status(400).json(err.message)
            })
    }

    static deleteMember(req, res) {
        ProjectMember.findByIdAndRemove({ _id: req.params.id })
            .then(() => {
                res.status(200).json({
                    message: 'delete success'
                })
            })
            .catch(err => {
                res.status(404).json(err.message)
            })
    }

    static getMember(req, res) {
        ProjectMember.find({ project: req.params.projectId })
            .populate('member')
            .then((data) => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(404).json(err.message);
            })
    }
}

module.exports = ProjectMemberController;