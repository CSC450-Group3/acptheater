// https://dev.to/mychal/protected-routes-with-react-function-components-dh#:~:text=Protected%20routes%20allow%20us%20to,may%20contain%20private%20user%20information.
// https://medium.com/javascript-in-plain-english/how-to-set-up-protected-routes-in-your-react-application-a3254deda380
import React from 'react';
import { Redirect } from 'react-router-dom';

const ProtectedRoute = (props) => {
    
    const {accessType, user, component: Component, ...rest} = props;
    const isAuthenticated = user.user_id === "" ? false : true

    



    //use is logged in
    if(isAuthenticated ){
        switch(accessType){
            //admin only routes
            case "ADMIN":
                return user.type === 'A' ? (
                    <Component {...rest} {...props}/>
                ):(
                    <Redirect to={{pathname: '/Unauthorized'}} />
                );
              
          
            // routes available for all logged in users
            case "GENERAL":
                // need extra verification accessings messages
                if(props.path ==='/Thread/:thread_id/User/:user_id'){
                    //verify accessing user is an admin or has the same user_id
                    return user.type === 'A' || user.user_id == props.computedMatch.params.user_id ? (
                        <Component {...rest} {...props}/> 
                    ):(
                        <Redirect to={{pathname: '/Unauthorized'}} props={props} /> 
                    )
                }
                //otherwise verify the user is authenticated with the appropriate type
                else{
                    return user.type === 'C' || user.type === 'A' ? ( 
                        <Component {...rest} {...props}/> 
                    ):( 
                        <Redirect to={{pathname: '/Unauthorized'}} props={props} /> 
                    );
                }
                                 
            default:
                return <Redirect to={{pathname: '/Unauthorized'}} />

        }
    }
    // redirect to unauthorized route
    else{
        return <Redirect to={{pathname: '/Unauthorized'}} />
    }
}

export default ProtectedRoute;