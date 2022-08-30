import { useEffect, useState } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { CurrentUserContext } from '../context/CurrentUserContext';
import Header from './Header';
import Login from './Login';
import Register from './Register';
import Main from './Main';
import Footer from './Footer';
import PopupProfil from './PopupProfil';
import PopupCard from './PopupCard';
import PopupAvatar from './PopupAvatar';
import ImagePopup from './ImagePopup';
import PopupDelete from './PopupDelete';
import InfoTooltip from './InfoTooltip';
import api from '../utils/api';
import auth from '../utils/auth';
import ProtectedRoute from './ProtectedRoute';
import '../index.css';


const App = () => {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState({});
    const [cardForPopup, setCardForPopup] = useState(null); 
    const [isPopupProfilOpen, setIsPopupProfilOpen] = useState(false);
    const [isPopupCardOpen, setIsPopupCardOpen] = useState(false);
    const [isPopupAvatarOpen, setIsPopupAvatarOpen] = useState(false);
    const [isPopupDelete, setIsPopupDelete] = useState(false);
    const [isDeleteCard, setIsDeleteCard] = useState({});
    const [isInfoTooltip, setIsInfoTooltip] = useState(false)
    const [cards, setCards] = useState([]);
    const [user, setUser] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState('');    
    const [token, setToken] = useState('')
    //const [start, setStart] = useState(false);

        useEffect(() => {
        const jwt = localStorage.getItem("JWT");
        if (jwt) {
            auth.getControl(jwt)
                .then((res) => {
                    setEmail(res.data.email);
                    setUser(true);
                    setLoggedIn(true);
                    setCurrentUser(res.data);
                    setToken(jwt);
                    navigate("/main");
                }).catch((err) => console.log(err))
        } else {
            navigate("/sign-up");
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loggedIn]);

    useEffect(() => {
        if (token) { api.getInitialProfil(token).then((data) => {
           setCurrentUser(data);
           })
           .catch((err) => console.log(err));

        api.getInitialCards(token).then((data) => {
           setCards(data);
           })
           .catch(err => console.log(err));
        }
   }, [token]);
    
    const handleCardLike = (card, isLiked) => {
        api.changeLikeCardStatus(card._id, isLiked, token).then((newCard) => {
          setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => console.log(err));
    }

    const handleLogin = () => {
            navigate("/sign-in");
            setUser(!user);
        }

    const registrationSubmit = (data) => {
        auth.getRegistration(data)
            .then((res) => {
                if (res) {setUser(true)};
            })
            .catch((err) => {
                setUser(false)
                console.log(err);
            })
            .finally(() => {
                setIsInfoTooltip(true);
            })
    }

    const autorizationSubmit = (data) => {
        setEmail(data.email);
         auth.getAutorization(data)
            .then((res) => {
                if (res.token) {
                    setLoggedIn(true);
                    localStorage.setItem('JWT', res.token);
                    //setToken(res.token);
                    navigate("/main")
                } else {
                    setEmail('')
                    setUser(false);
                    setIsInfoTooltip(true);
                }          
            })
            .catch(err => console.log(err))
        }

    const handlePopupDelete = (card) => {
        setIsPopupDelete(true);
        setIsDeleteCard(card);
    }

    const deleteCard = () => {
        handleCardDelete();
        setIsPopupDelete(false)
    }

    const handleCardDelete = () => {
        api.deleteCard(isDeleteCard._id, token).then(() => {
            setCards((cards) => cards.filter((c) => c._id !== isDeleteCard._id));
            setIsPopupDelete(false);
        })
        .catch((err) => console.log(err))          
    }

    const onUpdateUser = (e) => {
        api.correctUserInfo(e, token).then((data) => {
            setCurrentUser(data);
            setIsPopupProfilOpen(false);
        })
        .catch((err) => console.log(err));
    }

    const onUpdateAvatar = (e) => {
        api.correctUserAvatar(e, token).then((data) => {
            setCurrentUser(data);
            setIsPopupAvatarOpen(false);
        })
        .catch((err) => console.log(err))
    }

    const addNewCard = (e) => {
        api.addNewCards(e, token).then((data) => {
            setCards((cards) => {
                return [data, ...cards];
            });
            setIsPopupCardOpen(false);
        })
        .catch((err) => console.log(err))
    }

    const onProfilPopupOpen = () => {
        setIsPopupProfilOpen(true)
    }

    const onAvatarPopupOpen = () => {
        setIsPopupAvatarOpen(true);
    }

    const onPopupCarOpen = () => {
        setIsPopupCardOpen(true)
    }

    const closeAllPopups = () => {
        setIsPopupProfilOpen(false);
        setIsPopupCardOpen(false);
        setIsPopupAvatarOpen(false);
        setIsPopupDelete(false);
        setIsInfoTooltip(false);
        setIsDeleteCard({});
    }

    const handleCardClick = (card) => {
        setCardForPopup(card);
    }

    const onCardClick = () => {
        setCardForPopup(null);
    }

    const handleRegistration = () => {
        if (user && loggedIn) {
          localStorage.removeItem("JWT");
          setUser(false)
          setLoggedIn(false);
          setEmail('')
          navigate("/sign-in");
        } else if (user) {
          setUser(false);
          navigate("/sign-up");
        } else {
          setUser(true);
          navigate("/sign-in")
        }
      }

    return ( 
    <div className="page">
            <CurrentUserContext.Provider value={currentUser} >
                    <Header user={user} email={email} loggedIn={loggedIn} handleClick={handleRegistration} />
                    <Routes>                        
                        <Route path="/sign-up" element={<Register onSubmit={registrationSubmit} handleLogin={handleLogin} />} />
                        <Route path="/sign-in" element={<Login  onSubmit={autorizationSubmit} />} />
                        <Route path="/main" element={
                            <ProtectedRoute loggedIn={loggedIn} >
                                <Main onEditProfile={onProfilPopupOpen} 
                                     onAddPlace={onPopupCarOpen} 
                                    onEditAvatar={onAvatarPopupOpen}                         
                                    handleCardClick={handleCardClick}
                                    cards={cards}
                                    handleCardLike={handleCardLike}
                                    handleDeleteClick={handlePopupDelete}/>
                                <Footer />
                            </ProtectedRoute>
                            } />
                        <Route path="*" element={<Register onSubmit={registrationSubmit} handleLogin={handleLogin} /> } />
                    </Routes>
                    <InfoTooltip isOpen={isInfoTooltip} onClose={closeAllPopups} user={user} />
                    <ImagePopup card={cardForPopup} onCardClick={onCardClick} />
                    <PopupAvatar isOpen={isPopupAvatarOpen} onClose={closeAllPopups} onUpdateAvatar={onUpdateAvatar} />
                    <PopupProfil isOpen={isPopupProfilOpen} onClose={closeAllPopups} onUpdateUser={onUpdateUser} />
                    <PopupCard isOpen={isPopupCardOpen} onClose={closeAllPopups} handleNewCard={addNewCard} />
                    <PopupDelete isOpen={isPopupDelete} onClose={closeAllPopups} deleteCard={deleteCard} />       
            </CurrentUserContext.Provider>
    </div>
    );
}

export default App;