import React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

import Header from 'containers/Header';

import './style.css';

const InfoSection = ({
  title,
  children,
}) => (
  <div className="author-info-section--container">
    <h5 className="author-info-section--title">{title}</h5>
    <div className="author-info-section--content">
      {children}
    </div>
  </div>
)

const InfoPiece = ({
  name,
  value,
}) => (
  <div className="author-info-piece--container">
    <div className="author-info-piece--name">{name}</div>
    <div className="author-info-piece--value">{value}</div>
  </div>
)


const AuthorInfo = ({
  message: {
    user_context,
    conversation_id,
  },
  author,
  returnToConversation,
}) => {
  return <div className="agora-sidebar--container">
    <div className="agora-single-conversation-header--container">
      <Header>
        <div className="agora-author-info--back" onClick={() => returnToConversation(conversation_id)}>&lt; back</div>
      </Header>
    </div>
    <div className="agora-author-info--container">
      <InfoSection title="User">
        <InfoPiece name="username" value={author.username} />
        <InfoPiece name="first joined" value={(new Date(Date.parse(`${author.created_at}Z`))).toDateString()} />
      </InfoSection>
      <InfoSection title="Page">
        <InfoPiece name="messaged from" value={<a target="_blank" href={user_context.pageURL}>{user_context.pageURL}</a>} />
        <InfoPiece name="visited page" value={user_context.pageTitle} />
        <InfoPiece name="previous page" value={user_context.referrer || "Unknown"} />
      </InfoSection>
      {user_context.location && user_context.location.country &&
        <InfoSection title="Location">
          <InfoPiece name="country" value={user_context.location.country} />
          <InfoPiece name="city" value={user_context.location.city} />
          <Map className="agora-author-info--map" center={[user_context.location.lat, user_context.location.lon]} zoom={8}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
          </Map>
        </InfoSection>
      }
    </div>
  </div>
}

export default AuthorInfo