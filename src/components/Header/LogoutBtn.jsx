import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { clearUserData } from '../../store/userSlice';
import { clearUserNotification } from '../../store/notificationSlice';
import "../../styles/logout.css"
import awsAuthService from '../../aws/awsAuthService';
import { clearPosts } from '../../store/postSlice';
import { faSignOutAlt, faPowerOff, faDoorOpen, faEject } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react';


const LogoutBtn = ({handleMenuToggle, title}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showConfirm, setShowConfirm] = useState(false); // State for confirmation modal

    const logoutHandler = () => {
        setShowConfirm(true); // Show confirmation modal
        
    };

    const confirmLogout = async () => {
        await awsAuthService.logout();
        dispatch(logout());
        dispatch(clearUserData());
        dispatch(clearUserNotification()); // Clear notifications
        dispatch(clearPosts()); // Clear posts
        setShowConfirm(false); // Close confirmation modal

        //adding this check because menu toggle function is hit for hamburger icon toggle as well
        if(handleMenuToggle !== undefined) handleMenuToggle()
        navigate("/PoeticOdyssey/login");
    };

    const cancelLogout = () => {
        setShowConfirm(false); // Close confirmation modal
    };

    return (
        <div className="relative">
            {/* Confirmation Modal */}
            {showConfirm && (
               <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50 animate-glowBackground" style={{ top: '383px' }}>
               <div className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 text-white rounded-lg p-8 shadow-2xl max-w-lg w-10/12 z-60 transform transition-all animate-slideInLeft animate-popIn animate-glowingModal animate-tiltIn">
                   <h2 className="text-2xl font-extrabold mb-6 text-center text-yellow-400 animate-bounce animate-neonGlow">
                       Are you sure you want to logout?
                   </h2>
                   <div className="flex justify-center gap-6">
                       <button
                           onClick={confirmLogout}
                           className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transform hover:scale-110 transition duration-300 ease-in-out animate-popIn animate-buttonGlow animate-neonPulse"
                       >
                           Yes, Logout
                       </button>
           
                       <button
                           onClick={cancelLogout}
                           className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transform hover:scale-110 transition duration-300 ease-in-out animate-popIn animate-buttonGlow animate-neonPulse"
                       >
                           No, Stay
                       </button>
                   </div>
               </div>
           </div>
           
           
            )}

            {/* Logout Button */}
            <div className='flex justify-center items-center'>
            <Tippy
                key={"Notification"}
                content={<span className="animate-pulse w-16 text-white">{title}</span>}
                placement="right"
                theme="dark"
                interactive={true}
                delay={[100, 0]}
                appendTo={() => document.body}
            >
                <button
                    className="inline-block ml-0 mr-0 px-3 py-2 text-2xl text-white bg-red-600 rounded-full shadow-lg transition duration-300 transform hover:bg-red-700 hover:scale-105 hover:shadow-xl"
                    onClick={logoutHandler}
                    title={title}
                >
                    <FontAwesomeIcon icon={faPowerOff} className="" />
                </button>
            </Tippy>
            </div>
            

            
        </div>
    );
}

export default LogoutBtn;
