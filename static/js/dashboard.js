/**
 * CAS Portal - Robust Diagram Interactivity
 */

(function() {
    console.log("[CAS] Interactivity Engine Starting...");

    function enhance() {
        // Broad sweep for ANY svg that looks like a mermaid diagram
        const svgs = document.querySelectorAll('svg[id^="mermaid-"]');
        
        svgs.forEach(svg => {
            const container = svg.closest('.mermaid') || svg.parentElement;
            
            if (container && !container.classList.contains('enhanced')) {
                console.log("[CAS] Enhancing SVG:", svg.id);
                
                // 1. Break constraints
                svg.style.maxWidth = "none";
                svg.style.width = "auto";
                svg.removeAttribute("width");
                svg.removeAttribute("height");
                
                // 2. Container setup
                container.style.position = 'relative';
                container.style.display = 'block';
                
                // 3. Control Box
                const controls = document.createElement('div');
                controls.className = 'diagram-controls';
                
                const btn = document.createElement('button');
                btn.className = 'diagram-btn';
                btn.innerText = 'FULLSCREEN';
                btn.onclick = (e) => {
                    e.preventDefault();
                    container.classList.toggle('fullscreen');
                    btn.innerText = container.classList.contains('fullscreen') ? 'EXIT' : 'FULLSCREEN';
                };
                
                controls.appendChild(btn);
                container.appendChild(controls);
                
                // 4. Pan/Zoom
                if (typeof svgPanZoom !== 'undefined') {
                    try {
                        svgPanZoom(svg, {
                            zoomEnabled: true,
                            controlIconsEnabled: true,
                            fit: true,
                            center: true
                        });
                    } catch (e) { console.error("[CAS] Zoom error", e); }
                }
                
                container.classList.add('enhanced');
            }
        });
    }

    // Run every second to catch late renders
    setInterval(enhance, 1000);
    
    // Run on boot
    if (document.readyState === "complete") {
        enhance();
    } else {
        window.addEventListener('load', enhance);
    }
})();
