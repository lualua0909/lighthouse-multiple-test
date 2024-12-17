import { useRef } from "react";
import './index.css'
import Spline from "@splinetool/react-spline";

function Render3D() {
    const splineRef: any = useRef();
    const chair = useRef();

    function onLoad(spline: any) {
        const obj = spline.findObjectByName('chair');
        chair.current = obj;
        splineRef.current = spline;
    }

    return (
        <>
            <div style={{ position: 'relative' }}>
                <Spline
                    scene="https://prod.spline.design/Gvxxn24r0nXLwYfY/scene.splinecode"
                    style={{ padding: 0, pointerEvents: 'auto' }}
                />
            </div>
            <div style={{ position: 'absolute', zIndex: 9999, top: '50%', left: '60%' }} className="tag">Lighthouse Test</div>

            <Spline
                ref={splineRef}
                scene="https://prod.spline.design/aLXltjgQ14kvEgls/scene.splinecode"
                // onSplineMouseHover={onSplineMouseDown}
                onLoad={onLoad}
                style={{ position: 'absolute', top: 0, width: 320, height: 500, padding: 0 }}
            />
            <Spline
                scene="https://prod.spline.design/Ly-ycCAmYCyStPfo/scene.splinecode"
                style={{ position: 'absolute', top: 500, right: 0, width: 100, height: 200, padding: 0 }}
            />

        </>
    );
}

export default Render3D;
