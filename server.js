//import express module
const exp=require("express")

//import dotenv
require("dotenv").config()

//call exp constructor
const app=exp()

//create a server
app.listen(80,()=>console.log("Listening to port 80"))






//Import IPRange Protocol
var iprange = require('iprange');
 


//Running shell commands in nodejs

const subProcess = require('child_process')
app.get("/refresh",async (req,res)=>{
    let count=0
    //finding all ips in a network
    var range = iprange('192.168.0.0/24');

    //calculating total IPs
    totalIps=range.length
    console.log(totalIps)

    // console.log(range)

    //Iterating through IPs
    for(ip of range)
    {
        //Executing ping command for each IP
        subProcess.exec("ping "+ip,(err, stdout, stderr)=>{
                count=count+1
                if(count==totalIps)
                {
                    //Get MAC address of all connected devices
                    subProcess.exec('arp -a', (err, stdout, stderr) => {
                    if (stderr) {
                      console.error(err)
                      process.exit(1)
                    } else {

                      let result=stdout.toString()
                      let li=result.split("\n")
                      console.log(`Result from shell: ${li}`)

                      //Clearing all ARP requests
                      subProcess.exec('arp -d', (err, stdout, stderr) => {
                        if (stderr) {
                          console.error(err)
                          process.exit(1)
                        } else {
                          console.log(`ARP entries cleared sucessfully`)
                        }
                      })

                      //Sending response
                      res.send({message:"Getting all IPs",payload:result})
                    }
                  })
                  
                }
        })
    }

   

})
//     subProcess.exec('ping 192.168.0.122', (err, stdout, stderr) => {
//         if (stderr) {
//           console.error(err)
//           process.exit(1)
//         } else {
//           res.send({message:stdout.toString()})
//           subProcess.exec('arp -a', (err, stdout, stderr) => {
//             if (stderr) {
//               console.error(err)
//               process.exit(1)
//             } else {
//               console.log(`The stdout Buffer from shell: ${stdout.toString()}`)
//               console.log(`The stderr Buffer from shell: ${stderr.toString()}`)
//             }
//           })
//         }
//       })
    
// })



// subProcess.exec('arp -a', (err, stdout, stderr) => {
//   if (stderr) {
//     console.error(err)
//     process.exit(1)
//   } else {
//     console.log(`The stdout Buffer from shell: ${stdout.toString()}`)
//     console.log(`The stderr Buffer from shell: ${stderr.toString()}`)
//   }
// })

//Invalid path middleware
app.use("*",(req,res)=>{
    res.send({message:"Invalid path"})
})

//Error handler middleware
app.use((err,req,res,next)=>{
    res.send({message:"Error occured ",error:err.message})
})