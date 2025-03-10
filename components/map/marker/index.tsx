import { OverlayView } from "@react-google-maps/api"
import { RocketIcon } from "@radix-ui/react-icons";

const markerCentre = (width: number, height: number) => ({
    x: -(width / 2),
    y: -(height / 2),
});
  

export const CustomMarker = ({ lat, lng, name }: { lat: number; lng: number; name: string }) => (
    <OverlayView
        position={{ lat, lng }}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        getPixelPositionOffset={markerCentre}
    >
        <div className="custom-marker bg-black px-2 rounded w-8 h-8 flex items-center justify-center shadow-lg" aria-label={name} title={name}>
            <RocketIcon />
            <div className="absolute left-1/2 -bottom-2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-black transform -translate-x-1/2"></div>
        </div>
    </OverlayView>
)