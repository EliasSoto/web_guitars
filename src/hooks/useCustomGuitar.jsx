import { useEffect, useState } from "react";
import { useBaseGuitar } from "./useBaseGuitar";
import { getUserFilteredComponents } from "../services/componentService";
import { createUserCustomGuitar } from "../services/customGuitarService";
import { createOrderUser } from '../services/userOrderService';
import { createUserShipment } from '../services/useShipmentService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export function useCustomGuitar(config, setConfig, initialConfig) {
  const { guitar } = useBaseGuitar(config.madera, config.color);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [step, setStep] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  // Opciones de madera
  const woodOptions = [
    { name: 'Abeto', img: 'https://res.cloudinary.com/de5qrezpl/image/upload/v1750959250/iigybuaaorzek0g8bib5.png', price: 100000 },
    { name: 'Caoba', img: 'https://res.cloudinary.com/de5qrezpl/image/upload/v1750959027/ba2toylmd0456vzhittb.jpg', price: 100000 },
    { name: 'Arce', img: 'https://res.cloudinary.com/de5qrezpl/image/upload/v1750959252/nqgbjii0s4gsjifuhtpp.png', price: 100000 },
    { name: 'Palisandro', img: 'https://res.cloudinary.com/de5qrezpl/image/upload/v1750959038/ubtheg7u8rvqewwepzrn.jpg', price: 100000 },
    { name: 'Nogal', img: 'https://res.cloudinary.com/de5qrezpl/image/upload/v1750959032/y3dlsz8lxcjrhump2qd8.jpg', price: 100000 },
    { name: 'Roble', img: 'https://res.cloudinary.com/de5qrezpl/image/upload/v1750959039/pkh7yjgvythaidf735q3.jpg', price: 100000 },
    { name: 'Ébano', img: 'https://res.cloudinary.com/de5qrezpl/image/upload/v1750959030/ngfe8saz3zjitbzwryt3.jpg', price: 100000 },
    { name: 'Tilo', img: 'https://res.cloudinary.com/de5qrezpl/image/upload/v1750959254/jwb8effplnguxeznt59b.png', price: 100000 },
    { name: 'Koa', img: 'https://res.cloudinary.com/de5qrezpl/image/upload/v1750959031/vonvze1j1trv6ks6zyg8.jpg', price: 100000 },
    { name: 'Cedro', img: 'https://res.cloudinary.com/de5qrezpl/image/upload/v1750959028/ikihlrtliporyjvp9rxe.jpg', price: 100000 },
  ];

// Opciones de clavijero
  const headstockOptions = [
    { id: 1, name: 'Tipo 1', img: "https://res.cloudinary.com/de5qrezpl/image/upload/v1750957913/p6idea6j0mom3edbnsgt.png", value: 'tipo1', price: 50000 },
    { id: 2, name: 'Tipo 2', img: "https://res.cloudinary.com/de5qrezpl/image/upload/v1750957925/gwynpzbrt3orqlwy6xw9.png", value: 'tipo2', price: 50000 },
    { id: 3, name: 'Tipo 3', img: "https://res.cloudinary.com/de5qrezpl/image/upload/v1750957935/xyusoeurb1jj4gqusuyv.png", value: 'tipo3', price: 50000 },
    { id: 4, name: 'Tipo 4', img: "https://res.cloudinary.com/de5qrezpl/image/upload/v1750957944/koloeybsctuibpfqastl.png", value: 'tipo4', price: 50000 },
    { id: 5, name: 'Tipo 5', img: "https://res.cloudinary.com/de5qrezpl/image/upload/v1750957952/porqjiokserpruci9bfl.png", value: 'tipo5', price: 50000 }
  ];

  // Opciones de cuerpo
  const bodyOptions = [
    { id: 6, value: 'strato', name: 'Strato', img: "https://res.cloudinary.com/de5qrezpl/image/upload/v1750964837/v7x1uwyzgg6efkmz0b0u.png", price: 80000 },
    { id: 7, value: 'telecaster', name: 'Telecaster', img: "https://res.cloudinary.com/de5qrezpl/image/upload/v1750964838/ij3sjohh9zwgos0xo5ya.png", price: 80000 },
    { id: 8, value: 'sg', name: 'SG', img: "https://res.cloudinary.com/de5qrezpl/image/upload/v1750964836/jfguvmm9q1gcbon3s17x.png", price: 80000 },
    { id: 9, value: 'lespaul', name: 'Les Paul', img: "https://res.cloudinary.com/de5qrezpl/image/upload/v1750964835/vgqgngbdhnn7y704avtv.png", price: 80000 },
    { id: 10, value: 'flyingv', name: 'Flying V', img: "https://res.cloudinary.com/de5qrezpl/image/upload/v1750964834/g57w2lbea9ia3q9ypl7d.png", price: 80000 },
  ];

  // Opciones de puente
  const bridgeOptions = {
    fijo: { value: 'fijo', name: 'Fijo', img: "https://res.cloudinary.com/de5qrezpl/image/upload/v1750964007/fmp5jhhvuowvphdqdanc.png" },
    flotante: { value: 'flotante', name: 'Flotante', img: "https://res.cloudinary.com/de5qrezpl/image/upload/v1750964005/fb5k2xljrhx5r1pbhhcz.png" },
    semiflotante: { value: 'semiflotante', name: 'Semiflotante', img: "https://res.cloudinary.com/de5qrezpl/image/upload/v1750964004/sjmkbsqcfos85mzpm19p.png" },
  };

  const isStep1Complete = () => {
    return (
      config.clavijero &&
      config.trastes &&
      config.cuerpo &&
      config.pastillas &&
      (config.jack || !mostrarJack) &&
      config.potenciometros &&
      config.puente !== ''
    );
  };

  const isStep2Complete = () => {
    return config.madera && config.color;
  };

  const mostrarJack = config.cuerpo === 'strato' || config.cuerpo === 'sg';

  const [maxComponentes, setMaxComponentes] = useState({
    pastillas: { S: 0, H: 0 },
    potenciometros: { volumen: 0, tono: 0 },
    puente: 1
  });

  const [selectedComponents, setSelectedComponents] = useState({
    pastillas: { S: [], H: [] },
    potenciometros: { volumen: [], tono: [] },
    puente: null
  });

  const [compatibles, setCompatibles] = useState({
    pastillas: { S: [], H: [] },
    potenciometros: { volumen: [], tono: [] },
    puentes: []
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchComponentsByType = async ({ type, subtype = "", is_active = "", limit = 1000 }) => {
    const params = {
      type,
      subtype,
      stock_only: true,
      is_active,
      page: 1,
      limit,
    };

    const [data, error] = await getUserFilteredComponents(params);
    const items = data?.components || [];
    return { items, error };
  };

  useEffect(() => {
    const total = calcularPrecioTotal();
    setTotalPrice(total);
  }, [selectedComponents]);

  const agregarComponente = (componente) => {
    if (!componente) return;

    if (componente.type === 'Pastilla') {
      const subtipo = componente.subtype?.toUpperCase() || 'S';
      const max = maxComponentes.pastillas[subtipo] || 0;
      const currentCount = selectedComponents.pastillas[subtipo]?.length || 0;

      if (currentCount >= max) {
        toast.error(`Ya seleccionaste el máximo de pastillas ${subtipo} (${max})`);
        return;
      }

      setSelectedComponents(prev => ({
        ...prev,
        pastillas: {
          ...prev.pastillas,
          [subtipo]: [...prev.pastillas[subtipo], componente]
        }
      }));

    } else if (componente.type === 'Potenciómetro') {
      const subtipo = componente.subtype?.toLowerCase() === 'tono' ? 'tono' : 'volumen';
      const max = maxComponentes.potenciometros[subtipo] || 0;
      const currentCount = selectedComponents.potenciometros[subtipo]?.length || 0;

      if (currentCount >= max) {
        toast.error(`Ya seleccionaste el máximo de potenciómetros ${subtipo} (${max})`);
        return;
      }

      setSelectedComponents(prev => ({
        ...prev,
        potenciometros: {
          ...prev.potenciometros,
          [subtipo]: [...prev.potenciometros[subtipo], componente]
        }
      }));

    } else if (componente.type === 'Puente') {
      const yaSeleccionado = selectedComponents.puente?.id === componente.id;

      if (yaSeleccionado) {
        setSelectedComponents(prev => ({ ...prev, puente: null }));
        return;
      }

      if (selectedComponents.puente) {
        toast.error('Solo puedes seleccionar un puente');
        return;
      }
      setSelectedComponents(prev => ({ ...prev, puente: componente }));
    }
  };

  const calcularMaximos = (config) => {
    const letras = config.pastillas ? config.pastillas.split('') : [];
    const countS = letras.filter(l => l === 'S').length;
    const countH = letras.filter(l => l === 'H').length;

    let volumenCount = 0;
    let tonoCount = 0;
    
    if (config.potenciometros) {
      const potConfig = config.potenciometros.toLowerCase();
      
      const volumenMatches = potConfig.match(/volumen/g);
      volumenCount = volumenMatches ? volumenMatches.length : 0;
      
      const tonoMatches = potConfig.match(/tono/g);
      tonoCount = tonoMatches ? tonoMatches.length : 0;
    }

    return {
      pastillas: { S: countS, H: countH },
      potenciometros: { volumen: volumenCount, tono: tonoCount },
      puente: 1
    };
  };

  const handleConfigChange = (key, value) => {
    setConfig(prev => {
      let newConfig = { ...prev, [key]: value };
      if (key === 'cuerpo') {
        // Resetear dependientes al cambiar el cuerpo
        newConfig.pastillas = '';
        newConfig.esActiva = false;
        newConfig.jack = '';
        newConfig.potenciometros = '';
      }
      return newConfig;
    });
  };

  const handleCreateCustomGuitar = async (paymentMethod) => {
    try {
      // Verificar que todos los componentes necesarios estén seleccionados
      const requiredComponents = [
        { type: 'pastillas', subtype: 'S', count: maxComponentes.pastillas.S },
        { type: 'pastillas', subtype: 'H', count: maxComponentes.pastillas.H },
        { type: 'potenciometros', subtype: 'volumen', count: maxComponentes.potenciometros.volumen },
        { type: 'potenciometros', subtype: 'tono', count: maxComponentes.potenciometros.tono },
        { type: 'puente', count: 1 }
      ];

      for (const req of requiredComponents) {
        if (req.type === 'puente') {
          if (!selectedComponents.puente && req.count > 0) {
            toast.error(`Debes seleccionar un puente`);
            return;
          }
        } else {
          const currentCount = selectedComponents[req.type][req.subtype].length;
          if (currentCount < req.count) {
            toast.error(`Debes seleccionar ${req.count} ${req.type} de ${req.subtype}`);
            return;
          }
        }
      }

      // Función para agrupar componentes por ID y contar la cantidad
      const groupComponents = (components) => {
        const grouped = {};
        components.forEach(comp => {
          if (grouped[comp.id]) {
            grouped[comp.id].quantity += 1;
          } else {
            grouped[comp.id] = {
              component_id: comp.id,
              quantity: 1
            };
          }
        });
        return Object.values(grouped);
      };

      // Preparar los detalles de los componentes agrupados
      const componentDetails = [
        ...groupComponents(selectedComponents.pastillas.S),
        ...groupComponents(selectedComponents.pastillas.H),
        ...groupComponents(selectedComponents.potenciometros.volumen),
        ...groupComponents(selectedComponents.potenciometros.tono)
      ];

      // Agregar puente (siempre será quantity: 1)
      if (selectedComponents.puente) {
        componentDetails.push({
          component_id: selectedComponents.puente.id,
          quantity: 1
        });
      }

      // Agregar cuerpo como componente
      const cuerpoSeleccionado = bodyOptions.find(b => b.value === config.cuerpo);
      if (cuerpoSeleccionado) {
        componentDetails.push({
          component_id: cuerpoSeleccionado.id,
          quantity: 1
        });
      }

      // Agregar clavijero como componente
      const clavijeroSeleccionado = headstockOptions.find(h => h.value === config.clavijero);
      if (clavijeroSeleccionado) {
        componentDetails.push({
          component_id: clavijeroSeleccionado.id,
          quantity: 1
        });
      }

      // Crear objeto para enviar a la API
      const customGuitarData = {
        guitar_id: guitar.id,
        component_details: componentDetails,
        custom_color: config.color || null,
        custom_fret: config.trastes || null,
        jack_position: config.jack || null,
      };

      // Llamar al servicio
      const [response, error] = await createUserCustomGuitar(customGuitarData);

      if (error) {
        throw new Error(error);
      }

      // Crear pedido con la guitarra creada
      const orderData = {
        status: 'pagado',
        payment_method: paymentMethod,
        items: [{ custom_guitar_id: response.id, quantity: 1 }]
      };

      const [order, orderError] = await createOrderUser(orderData);

      // Crear envío con el ID del pedido
      const orderId = Array.isArray(order) ? order[0].id : order.id;
      const [shipment, shipmentError] = await createUserShipment({ order_ids: [orderId] });

      if (shipmentError) throw new Error(shipmentError);

      toast.error('¡Pedido y envío creados exitosamente!');

      setStep(1);
      setConfig(initialConfig);
      setSelectedComponents({
        pastillas: { S: [], H: [] },
        potenciometros: { volumen: [], tono: [] },
        puente: null
      });

      navigate('/profile/orders_guitarcustom');

    } catch (error) {
      toast.error(`Error al crear guitarra personalizada: ${error.message}`);
    }
  };

  const estaSeleccionado = (componente) => {
    if (!componente) return false;

    if (componente.type === 'Pastilla') {
      const subtipo = componente.subtype?.toUpperCase() || 'S';
      return selectedComponents.pastillas[subtipo]?.some(c => c.id === componente.id);
    }
    if (componente.type === 'Potenciómetro') {
      const subtipo = componente.subtype?.toLowerCase() === 'tono' ? 'tono' : 'volumen';
      return selectedComponents.potenciometros[subtipo]?.some(c => c.id === componente.id);
    }
    if (componente.type === 'Puente') {
      return selectedComponents.puente?.id === componente.id;
    }
    return false;
  };

  const calcularPrecioTotal = () => {
    let total = 0;

    // Precio base de la guitarra
    if (guitar?.sale_price) {
      total += guitar.sale_price;
    }

    // Precio del clavijero seleccionado
    const selectedHeadstock = headstockOptions.find(h => h.value === config.clavijero);
    if (selectedHeadstock) {
      total += selectedHeadstock.price;
    }

    // Precio del cuerpo seleccionado
    const selectedBody = bodyOptions.find(b => b.value === config.cuerpo);
    if (selectedBody) {
      total += selectedBody.price;
    }

    // Precio de componentes seleccionados
    selectedComponents.pastillas.S.forEach(p => {
      total += p.sale_price || 0;
    });

    selectedComponents.pastillas.H.forEach(p => {
      total += p.sale_price || 0;
    });

    selectedComponents.potenciometros.volumen.forEach(p => {
      total += p.sale_price || 0;
    });

    selectedComponents.potenciometros.tono.forEach(p => {
      total += p.sale_price || 0;
    });

    if (selectedComponents.puente) {
      total += selectedComponents.puente.sale_price || 0;
    }

    return total;
  };


  useEffect(() => {
  const nuevosMaximos = calcularMaximos(config);
  setMaxComponentes(nuevosMaximos);
}, [config]);

  useEffect(() => {
    if (step === 3 && config.pastillas && config.puente && config.potenciometros) {
      const fetchAll = async () => {
        setLoading(true);
        setError(null);

        try {
          // Separar pastillas por tipo (S o H)
          const pastillasPromises = [];
          if (config.pastillas.includes('S')) {
            pastillasPromises.push(fetchComponentsByType({
              type: "Pastilla",
              subtype: "S",
              is_active: config.esActiva ? "true" : "false",
            }));
          }
          if (config.pastillas.includes('H')) {
            pastillasPromises.push(fetchComponentsByType({
              type: "Pastilla",
              subtype: "H",
              is_active: config.esActiva ? "true" : "false",
            }));
          }

          // Separar potenciómetros por tipo (Volumen o Tono)
          const potenciometrosPromises = [];
          if (config.potenciometros.toLowerCase().includes("volumen")) {
            potenciometrosPromises.push(fetchComponentsByType({
              type: "Potenciómetro",
              subtype: "Volumen",
            }));
          }
          if (config.potenciometros.toLowerCase().includes("tono")) {
            potenciometrosPromises.push(fetchComponentsByType({
              type: "Potenciómetro",
              subtype: "Tono",
            }));
          }

          const puentePromise = fetchComponentsByType({
            type: "Puente",
            subtype: config.puente.charAt(0).toUpperCase() + config.puente.slice(1),
          });

          const allPromises = [
            ...pastillasPromises,
            ...potenciometrosPromises,
            puentePromise
          ];

          const results = await Promise.all(allPromises);
          
          // Procesar resultados de pastillas
          const pastillasResult = {
            S: [],
            H: []
          };
          
          if (config.pastillas.includes('S')) {
            const sResult = results.shift();
            pastillasResult.S = sResult.items || [];
          }
          if (config.pastillas.includes('H')) {
            const hResult = results.shift();
            pastillasResult.H = hResult.items || [];
          }
          
          // Procesar resultados de potenciómetros
          const potenciometrosResult = {
            volumen: [],
            tono: []
          };
          
          if (config.potenciometros.toLowerCase().includes("volumen")) {
            const volumenResult = results.shift();
            potenciometrosResult.volumen = volumenResult.items || [];
          }
          if (config.potenciometros.toLowerCase().includes("tono")) {
            const tonoResult = results.shift();
            potenciometrosResult.tono = tonoResult.items || [];
          }
          
          // Procesar resultado de puente
          const puenteResult = results.shift();
          const puentes = puenteResult.items || [];

          setCompatibles({
            pastillas: pastillasResult,
            potenciometros: potenciometrosResult,
            puentes,
          });

          const allErrors = results
            .filter(r => r.error)
            .map(r => r.error);
        
          if (allErrors.length) {
            setError(allErrors.join(", "));
          }
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchAll();
    }
  }, [step, config]);
  return {
    guitar,
    step,
    setStep,
    selectedComponent,
    setSelectedComponent,
    maxComponentes,
    selectedComponents,
    setSelectedComponents,
    compatibles,
    loading,
    error,
    agregarComponente,
    estaSeleccionado,
    calcularPrecioTotal,
    handleConfigChange,
    handleCreateCustomGuitar,
    isStep1Complete,
    isStep2Complete,
    mostrarJack,
    woodOptions,
    headstockOptions,
    bodyOptions,
    bridgeOptions,
    totalPrice,
  };
}
