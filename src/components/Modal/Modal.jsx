import React from "react";
import PropTypes from 'prop-types';
import './Modal.css';

const Modal = ({ ...props }) => {
    const { children, title, close, isOpen, avatar, avatarTheme, dark, light } = props;

    return (
        <>
        {isOpen ? (
            <div className="modal">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button onClick={() => close(false)} className="close">&times;</button>
                    </div>
                    {/* {avatar && 
                            <div className="theme-container">
                                <button
                                    className={avatarTheme ? 'active' : 'inactive'}
                                    onClick={() => dark()}
                                >
                                    Dark
                                </button>
                                <button
                                    className={!avatarTheme ? 'active' : 'inactive'}
                                    onClick={() => light()}
                                >
                                    Light
                                </button>
                            </div>
                        } */}
                    <div className="modal-body">
                        {children}
                    </div>
                </div>
            </div>
        </div>
        ): null}
        </>
    );
}

Modal.propTypes = {
    title: PropTypes.string,
    close: PropTypes.func,
    isOpen: PropTypes.bool,
}

Modal.defaultProps = {
    title: 'Title',
    close: () => {},
    isOpen: false,
}

export default Modal;