import React from 'react';
import './App.css';

const NICShaders = () => (
  <div className="App" style={{background: 'rgba(160,160,160,1.0)', margin: '10px', fontSize: 'medium'}}>
    <h1>NICShaders: GPU Compute Shaders for HTTP Traffic at Scale</h1>
    <p>CDN providers need compute at scale to do micro tasks, for example manipulating video media PTS/DTS, C2PA authentication/watermarking, making decisions based on network headers, e.g. modify HTTP output.</p>
    <p>The Linux Kernel networking stack has various optimisations such as BBR vs cubic, increased MTU and buffers etc - but ultimately this hits the CPU and the kernel generally which itself is a major bottleneck.</p>
    <h2>Can GPU Compute Shaders Output HTTP Directly to NIC with Kernel Bypass?</h2>
    <p>Achieving direct data transfer from a GPU compute shader to a NIC for HTTP output while bypassing the Linux kernel requires combining several advanced technologies.</p>
    <h3>Ideal Workflow</h3>
    <ol>
      <li>GPU compute shader processes incoming network data</li>
      <li>Modified data is written to GPU memory buffers</li>
      <li>Direct DMA transfer from GPU memory to NIC TX descriptors</li>
      <li>NIC transmits HTTP-formatted packets directly</li>
    </ol>
    <h2>GPU-to-NIC Direct Transfer Technologies</h2>
    <h3>GPU-Ether Framework</h3>
    <p><strong>GPU-Ether</strong> provides the most direct approach for GPU-native packet I/O. This system enables:</p>
    <ul>
      <li>Direct NIC-to-GPU DMA using persistent kernel threads that map Rx/Tx descriptors into GPU memory</li>
      <li>Ring descriptors and doorbell registers mapped into GPU memory using P2P-DMA for descriptors and general mmap + CUDA mapping for doorbells</li>
      <li>GPU threads mapped one-to-one with descriptors, allowing direct manipulation of packet transmission</li>
    </ul>
    <h3>GPUDirect RDMA Integration</h3>
    <ul>
      <li>Direct GPU memory access by third-party PCIe devices including NICs</li>
      <li>Same PCIe root complex requirement - both GPU and NIC must share the same upstream PCIe root complex</li>
      <li>Physical address mapping using nvidia_p2p_get_pages() instead of standard get_user_pages()</li>
    </ul>
    <h3>Zero-Copy Optimization</h3>
    <p><strong>Pinned Memory Allocation:</strong></p>
    <pre>
      cudaHostAlloc(&h_packets, packet_buffer_size, cudaHostAllocMapped);
      cudaHostGetDevicePointer(&d_packets, h_packets, 0);
    </pre>
    <p>This eliminates explicit transfers and allows fine-grained access, though with lower bandwidth via PCIe.</p>
    <h2>Current Limitations and Challenges</h2>
    <ul>
      <li>PCIe topology restrictions - GPU and NIC must share the same root complex</li>
      <li>Driver modifications required - Standard network drivers need GPUDirect RDMA support</li>
      <li>Platform-specific limitations may apply depending on hardware configuration</li>
      <li>Custom driver development often required for full implementation</li>
      <li>Limited commercial availability of complete solutions</li>
      <li>Expert-level kernel and driver programming needed for custom implementations</li>
    </ul>
    <h2>Practical Implementation Path</h2>
    <ul>
      <li>Use NVIDIA's DOCA GPUNetIO framework for production applications</li>
      <li>Implement DPDK-based user-space HTTP server with GPU integration</li>
      <li>Leverage existing kernel-bypass stacks like mTCP, TAS, or F-Stack for HTTP protocol handling</li>
      <li>Integrate with GPUDirect RDMA-enabled NIC drivers for direct GPU-NIC communication</li>
    </ul>
    <p>This combination provides a path to achieve GPU compute shader processing with direct NIC output while bypassing most kernel involvement, though it requires significant engineering effort and specialized hardware configurations.</p>

      <br/><br/>
      &copy; 2007 Pyrmont Brewery
      <br/><br/>
      0 OK, 0:1
      <br/>

  </div>
);

export default NICShaders;
