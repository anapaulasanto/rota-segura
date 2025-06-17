import React from "react";
import { GoogleMap, Marker, Polyline } from '@react-google-maps/api';
import mapImg from '../../assets/map-img.jpg'
import { FiMapPin } from "react-icons/fi";
import { IoIosArrowForward } from "react-icons/io";

const CardRouteOptions = ({ handleSelectRoute, routeOptions }) => {
  return (
      <div className="flex flex-col justify-center gap-1 pt-6 bg-neutral-200 shadow-md shadow-neutral-500 rounded-xl px-10 pb-1 h-auto text-neutral-500 ">
          <div className="flex flex-col mb-2">
              <div className="flex text-2xl text-text-central w-96 font-semibold items-center gap-2">
                  <FiMapPin className="w-[23px] h-[23px] text-black" />
                  <p>Rotas</p>
              </div>
              <p>Exibiremos as rotas de acordo com as suas preferências.</p>
          </div>
          {routeOptions && routeOptions.length > 0 ? (
              routeOptions.map((route, index) => (
                  <div
                      key={index}
                      className="flex flex-col shadow-md shadow-neutral-400 p-2 mb-3 h-max-[150px] cursor-pointer bg-white rounded-2xl"
                      onClick={() => handleSelectRoute(route)}
                  >
                      <div className="mb-1">
                          <GoogleMap
                              mapContainerStyle={{ height: "90px", width: "100%" }}
                              center={route.full_route_data.start_location}
                              zoom={12}
                              options={{
                                  disableDefaultUI: true,
                              }}
                          >
                              <Marker position={route.full_route_data?.start_location} />
                              <Marker position={route.full_route_data?.end_location} />

                              <Polyline
                                  path={google.maps.geometry.encoding.decodePath(route.full_route_data.overview_polyline.points)}
                                  options={{
                                      strokeColor: "#B58F3D",
                                      strokeWeight: 4
                                  }}
                              />
                          </GoogleMap>
                      </div>
                      <div className="flex justify-between items-start mt-1">
                          <h3 className="text-neutral-800 w-5/6"><strong>Via {route.summary}</strong></h3>
                          <p>{route.distance.text}</p>
                      </div>
                      <div className="flex items-center border-t-2 py-2 mt-2 hover:bg-neutral-50">
                          <p className="font-semibold w-28">{route.duration.text}</p>
                          <IoIosArrowForward className="ml-90" />
                      </div>
                  </div>
              ))
          ) : (
              <img className="max-h-[350px] mb-4" src={mapImg} alt="" />
          )}
      </div>
)
};

export default CardRouteOptions;
